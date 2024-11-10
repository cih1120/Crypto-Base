import CryptoPriceDisplay from '@/components/CryptoPriceDisplay';
import { getExchangeInfo } from '@/lib/api/exchangeInfo';

async function getSymbols() {
  const exchangeInfo = await getExchangeInfo();
  return exchangeInfo.data?.symbols || [];
}

export default async function Home() {
  const symbols = await getSymbols();
  return (
    <section className="mx-auto w-4/5 max-w-5xl p-4">
      {symbols.length > 0 ? (
        <CryptoPriceDisplay symbols={symbols} />
      ) : (
        <h1 className="w-full text-center text-lg font-extrabold">No data</h1>
      )}
    </section>
  );
}
