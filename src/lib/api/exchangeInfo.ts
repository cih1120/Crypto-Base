import { TradingStatus } from '@/types/enum';
import { API_URL } from '@/types/api';
import { request } from './index';

interface IExchangeSymbol {
  symbols: {
    symbol: string;
    status: TradingStatus;
    permissions: string[];
  }[];
}

const popularSymbols = [
  'BNBBTC',
  'BTCUSDT',
  'ETHUSDT',
  'DOGEUSDT',
  'SOLUSDT',
  'ADAUSDT',
  'XRPUSDT',
  'DOTUSDT',
  'LTCUSDT',
];

export const getExchangeInfo = async () => {
  const symbolsParam = JSON.stringify(popularSymbols);
  return await request<IExchangeSymbol>(
    `${API_URL.EXCHANGE_INFO}?symbols=${encodeURIComponent(symbolsParam)}`,
    {
      method: 'GET',
    }
  );
};
