import { API_URL } from '@/types/api';

import { request, IApiResponse } from './index';

export interface ISymbolPriceRes {
  symbol: string;
  price: string;
}

export const getPrices = async (
  symbols: string[]
): Promise<IApiResponse<ISymbolPriceRes[]>> => {
  const symbolsParam = JSON.stringify(symbols);
  return await request<ISymbolPriceRes[]>(
    `${API_URL.PRICE}?symbols=${encodeURIComponent(symbolsParam)}`,
    {
      method: 'GET',
    }
  );
};

export const getPrice = async (
  symbol: string
): Promise<IApiResponse<ISymbolPriceRes>> => {
  return await request<ISymbolPriceRes>(`${API_URL.PRICE}?symbol=${symbol}`, {
    method: 'GET',
    cache: 'force-cache',
  });
};
