import { KlineInterval } from '@/types/enum';
import { API_URL } from '@/types/api';

import { request, IApiResponse } from './index';

interface IKlinesRes extends Array<number | string> {
  [0]: number; // 開盤時間
  [1]: string; // 開盤價
  [2]: string; // 最高價
  [3]: string; // 最低價
  [4]: string; // 收盤價(當前K線未結束的即為最新價)
  [5]: string; // 成交量
  [6]: number; // 收盤時間
  [7]: string; // 成交額
  [8]: number; // 成交筆數
  [9]: string; // 主動買入成交量
  [10]: string; // 主動買入成交額
  [11]: string; // 請忽略該參數
}

export const getKlines = async (
  symbol: string,
  interval: KlineInterval,
  startTime?: number,
  endTime?: number
): Promise<IApiResponse<IKlinesRes[]>> => {
  const url = new URL(API_URL.KLINES);
  url.searchParams.append('symbol', symbol.toUpperCase());
  url.searchParams.append('interval', interval);
  if (startTime) url.searchParams.append('startTime', startTime.toString());
  if (endTime) url.searchParams.append('endTime', endTime.toString());
  return await request<IKlinesRes[]>(url.toString(), {
    method: 'GET',
  });
};
