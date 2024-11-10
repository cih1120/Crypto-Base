'use client';

import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { useError } from '@/context/ErrorContext';
import { Button } from '@/components/ui/button';
import { getKlines } from '@/lib/api/klines';
import { KlineInterval } from '@/types/enum';
import { IApiResponse } from '@/lib/api';

import { Skeleton } from '../ui/skeleton';

import CandlestickChart from './CandlestickChart';

export interface ChartDataItem {
  open: number;
  high: number;
  low: number;
  close: number;
  time: number;
}

interface TimeRange {
  label: string;
  interval: KlineInterval;
  start: number;
  end: number;
}

const timeRanges: TimeRange[] = [
  {
    label: '1天',
    interval: KlineInterval.MINUTES_15,
    start: DateTime.now().minus({ days: 1 }).startOf('day').toMillis(),
    end: DateTime.now().toMillis(),
  },
  {
    label: '7天',
    interval: KlineInterval.HOURS_1,
    start: DateTime.now().minus({ days: 7 }).startOf('day').toMillis(),
    end: DateTime.now().toMillis(),
  },
  {
    label: '近一個月',
    interval: KlineInterval.DAYS_1,
    start: DateTime.now().minus({ months: 1 }).startOf('day').toMillis(),
    end: DateTime.now().toMillis(),
  },
  {
    label: '近3個月',
    interval: KlineInterval.DAYS_1,
    start: DateTime.now().minus({ months: 3 }).startOf('day').toMillis(),
    end: DateTime.now().toMillis(),
  },
  {
    label: '1年',
    interval: KlineInterval.DAYS_1,
    start: DateTime.now().minus({ years: 1 }).startOf('day').toMillis(),
    end: DateTime.now().toMillis(),
  },
  {
    label: '年初至今',
    interval: KlineInterval.DAYS_1,
    start: DateTime.now().startOf('year').toMillis(),
    end: DateTime.now().toMillis(),
  },
];

const Chart = ({ symbol }: { symbol: string }) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]); // 儲存圖表數據
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[0]); // 當前選擇的時間範圍
  const [interval, setInterval] = useState<KlineInterval>(
    selectedTimeRange.interval
  ); // 當前時間間隔
  const [lastUpdated, setLastUpdated] = useState<string>(''); // 最後更新時間
  const [isLoading, setIsLoading] = useState<boolean>(true); // 加載狀態
  const { setError } = useError();

  // 定義可選的時間間隔
  const intervalOptions = [
    { value: KlineInterval.SECONDS_1, label: '1秒' },
    { value: KlineInterval.MINUTES_15, label: '15分鐘' },
    { value: KlineInterval.HOURS_1, label: '1小時' },
    { value: KlineInterval.DAYS_1, label: '1天' },
  ];

  // 處理時間範圍變更
  const handleTimeRangeChange = (range: TimeRange) => {
    setSelectedTimeRange(range);
    setInterval(range.interval);
  };

  // 獲取K線數據
  useEffect(() => {
    const fetchData = async () => {
      const { start, end } = selectedTimeRange;
      setIsLoading(true);
      try {
        const klines = await getKlines(symbol, interval, start, end);
        if (klines.status !== 200 || !klines.data) {
          setError(klines);
          return;
        }
        const formattedData = klines.data.map((kline: any) => ({
          time: kline[0] / 1000,
          open: parseFloat(kline[1]),
          high: parseFloat(kline[2]),
          low: parseFloat(kline[3]),
          close: parseFloat(kline[4]),
        }));
        setChartData(formattedData);
        setLastUpdated(DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'));
      } catch (error) {
        setError(error as IApiResponse<any>);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol, interval, selectedTimeRange, setError]);

  return (
    <div className="flex flex-col gap-2">
      {/* 時間篩選 */}
      <div className="flex flex-wrap justify-between gap-2">
        {/* 時間範圍按鈕 */}
        <div className="flex flex-wrap gap-1">
          {timeRanges.map((range) => (
            <Button
              key={range.label}
              onClick={() => handleTimeRangeChange(range)}
              disabled={isLoading}
              variant={
                selectedTimeRange.label === range.label ? 'default' : 'outline'
              }
            >
              {range.label}
            </Button>
          ))}
        </div>
        {/* 時間間隔選擇 */}
        <Tabs
          defaultValue={interval}
          value={interval}
          onValueChange={(value) => setInterval(value as KlineInterval)}
        >
          <TabsList className="flex w-full">
            {intervalOptions.map((option) => (
              <TabsTrigger
                disabled={isLoading}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      {/* 圖表顯示 */}
      <CandlestickChart chartData={chartData} isLoading={isLoading} />

      {/* 最後更新時間顯示 */}
      <div className="flex justify-end gap-1 text-sm">
        <p>Last Update:</p>
        {isLoading ? <Skeleton className="h-4 w-20" /> : <p>{lastUpdated}</p>}
      </div>
    </div>
  );
};

export default Chart;
