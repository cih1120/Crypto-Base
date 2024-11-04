import { useMemo } from 'react';

import { WS_URL } from '@/types/api';

import useWebSocket from '../hooks/useWebSocket';

export interface ISubscribePriceTickerRes {
  data: {
    s: string; // 交易對
    c: string; // 最新成交價格
    o: string; // 24 小時前開始第一筆成交價格
    h: string; // 24 小時內最高成交價
    l: string; // 24 小時內最低成交價
    v: string; // 成交量
    q: string; // 成交額
  };
}

// 訂閱價格更新的 WebSocket
export const useSubscribePriceTicker = (
  subscribeSymbols: string[] | string
) => {
  // 構建 WebSocket 訂閱的 URL
  const symbols = Array.isArray(subscribeSymbols)
    ? subscribeSymbols
        .map((symbol) => symbol.toLowerCase() + '@miniTicker')
        .join('/')
    : subscribeSymbols.toLowerCase() + '@miniTicker';

  const url = useMemo(
    () => `${WS_URL.SUBSCRIBE_MIN_TICKER}${symbols}`,
    [symbols]
  );

  const { message, isConnected, error } = useWebSocket(url);

  let parsedMessage: ISubscribePriceTickerRes | null = null;
  if (message) {
    try {
      parsedMessage = JSON.parse(message);
    } catch (parseError) {
      console.error('解析訊息失敗:', parseError);
    }
  }

  // 根据条件返回不同的结果
  if (!subscribeSymbols || subscribeSymbols.length === 0) {
    return { isConnected: false, error: null, message: null };
  }

  return { message: parsedMessage, isConnected, error };
};
