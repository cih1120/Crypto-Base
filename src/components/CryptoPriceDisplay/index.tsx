'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';

import { useSubscribePriceTicker } from '@/lib/ws/usePriceTicker';
import { useError } from '@/context/ErrorContext';
import { TradingStatus } from '@/types/enum';
import { getPrices } from '@/lib/api/price';

import CryptoCard from './CryptoCard';

export interface ICryptoPriceDisplayProps {
  symbol: string;
  price?: number | null;
  status: TradingStatus;
}

type PricesData = {
  [key: string]: number | null;
};

function CryptoPriceDisplay({
  symbols,
}: {
  symbols: ICryptoPriceDisplayProps[];
}) {
  const [pricesData, setPricesData] = useState<PricesData>({});
  const { setError } = useError();

  // 使用 useMemo 優化 symbolList 的計算，避免不必要的重複計算
  const symbolList = useMemo(() => {
    return symbols.map(({ symbol }) => symbol);
  }, [symbols]);

  // 訂閱價格更新的 WebSocket
  const { message } = useSubscribePriceTicker(symbolList);

  // 初始化，獲取最新價格
  useEffect(() => {
    const fetchInitialPrices = async () => {
      const initPrices = await getPrices(symbolList);

      if (initPrices.status !== 200 || !initPrices.data) {
        setError(initPrices);
        return;
      }

      const formattedData = initPrices.data.reduce(
        (acc, { symbol, price }) => {
          if (!acc[symbol]) {
            acc[symbol] = parseFloat(price);
          }
          return acc;
        },
        { ...pricesData }
      );
      setPricesData(formattedData);
    };
    fetchInitialPrices();
  }, [symbolList]);

  // 更新特定 symbol 的價格
  const updatePrice = useCallback((symbol: string, latestPrice: number) => {
    setPricesData((prev) => {
      if (prev[symbol] !== latestPrice) {
        return { ...prev, [symbol]: latestPrice };
      }
      return prev;
    });
  }, []);

  // 接收 WebSocket 訊息並更新價格
  useEffect(() => {
    if (message) {
      const { s: symbol, c: latestPrice } = message.data;
      updatePrice(symbol, parseFloat(latestPrice));
    }
  }, [message, updatePrice]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {symbols.map(({ symbol, status }) => (
        <CryptoCard
          key={symbol}
          symbol={symbol}
          price={pricesData[symbol] ?? null}
          status={status}
        />
      ))}
    </div>
  );
}

export default CryptoPriceDisplay;
