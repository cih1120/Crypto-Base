'use client';

import { createChart, IChartApi } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

import { Skeleton } from '../ui/skeleton';

import { ChartDataItem } from './index';

const CandlestickChart = ({
  chartData,
  isLoading,
}: {
  chartData: ChartDataItem[];
  isLoading: boolean;
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const [candlestickSeries, setCandlestickSeries] = useState<any>(null);

  const chartOptions = {
    height: 500,
    autoSize: true,
    layout: {
      background: {
        color: '#181a1e',
      },
    },
    localization: {
      priceFormatter: (price: number) => {
        return price.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 10, // 最大到小數點10位數
        });
      },
    },
  };

  useEffect(() => {
    if (chartRef.current && !chartInstanceRef.current) {
      const chart = createChart(chartRef.current, chartOptions);
      const series = chart.addCandlestickSeries({});
      setCandlestickSeries(series);
      chartInstanceRef.current = chart;
      chart.timeScale().fitContent();
    }
  }, [chartRef]);

  useEffect(() => {
    if (candlestickSeries && chartData.length > 0) {
      candlestickSeries.setData(chartData);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.timeScale().fitContent();
      }
    }
  }, [candlestickSeries, chartData]);

  return (
    <div className="container relative mx-auto h-[500px]">
      <div className="w-full" id="chart" ref={chartRef}></div>
      {isLoading && (
        <div className="absolute inset-0 z-10 h-full w-full bg-black/10">
          <Skeleton className="h-full w-full" />
        </div>
      )}
    </div>
  );
};

export default CandlestickChart;
