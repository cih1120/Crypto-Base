import { API_URL } from '@/types/api';

import { request } from './index';

export interface ISymbolPriceRes {
  symbol: string;
  price: string;
}

// export interface ISymbolPriceRes {
//   data: {
//     s: string; // 交易對
//     c: string; // 最新成交價格
//   };
// }
// export interface ISymbolPriceRes {
//     "symbol": "LTCBTC",
//     "price": "4.00000200"
// }

export const getPrices = async (
  symbols: string[]
): Promise<ISymbolPriceRes[]> => {
  const symbolsParam = JSON.stringify(symbols);
  return await request<ISymbolPriceRes[]>(
    `${API_URL.PRICE}?symbols=${encodeURIComponent(symbolsParam)}`,
    {
      method: 'GET',
      // cache: 'force-cache',
    }
  );
};

export const getPrice = async (symbol: string): Promise<ISymbolPriceRes> => {
  return await request<ISymbolPriceRes>(`${API_URL.PRICE}?symbol=${symbol}`, {
    method: 'GET',
    cache: 'force-cache',
  });
};
