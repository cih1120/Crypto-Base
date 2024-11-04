import { TradingStatus } from '@/types/enum';
import { API_URL } from '@/types/api';

import { request } from './index';

interface IExchangeSymbol {
  symbols: {
    symbol: string;
    status: TradingStatus;
  }[];
}

export const getExchangeInfo = async () => {
  const response = await request<IExchangeSymbol>(API_URL.EXCHANGE_INFO, {
    method: 'GET',
  });

  // 只返回前 9 個交易對
  return {
    symbols: response.symbols.slice(0, 9),
  };
};
