import React from 'react';

import Chart from '@/components/Chart';

interface SymbolPageProps {
  params: {
    symbol: string;
  };
}

const SymbolPage: React.FC<SymbolPageProps> = ({ params }) => {
  const { symbol } = params;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-black">{symbol}</h1>
      <Chart symbol={symbol} />
    </div>
  );
};

export default SymbolPage;
