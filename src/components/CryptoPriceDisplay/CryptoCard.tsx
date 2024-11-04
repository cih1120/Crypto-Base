import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { ICryptoPriceDisplayProps } from '.';

function CryptoCard({ symbol, price, status }: ICryptoPriceDisplayProps) {
  const isTrading = status === 'TRADING';

  return (
    <Link
      href={isTrading ? `/${symbol}` : '#'}
      key={symbol}
      className={cn(
        'transition',
        isTrading ? 'hover:-translate-y-2' : 'cursor-not-allowed'
      )}
    >
      <Card className="w-full">
        <CardHeader className="py-4">
          <CardTitle>{symbol}</CardTitle>
          <Badge
            className="w-fit"
            variant={isTrading ? 'default' : 'destructive'}
          >
            {status}
          </Badge>
        </CardHeader>
        <CardContent>
          <Price price={price} />
        </CardContent>
      </Card>
    </Link>
  );
}

function Price({ price: currentPrice }: { price: number | null | undefined }) {
  const previousPrice = useRef<number | null | undefined>(null);

  useEffect(() => {
    previousPrice.current = currentPrice;
  }, [currentPrice]);

  const determineColor = () => {
    if (
      currentPrice === null ||
      currentPrice === undefined ||
      previousPrice.current === null ||
      previousPrice.current === undefined
    ) {
      return 'text-black';
    }
    return currentPrice > previousPrice.current
      ? 'text-green-500'
      : 'text-red-500';
  };

  return currentPrice !== null ? (
    <p className={cn(`text-3xl font-bold`, determineColor())}>{currentPrice}</p>
  ) : (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
}

export default React.memo(CryptoCard, (prevProps, nextProps) => {
  return prevProps.price === nextProps.price;
});
