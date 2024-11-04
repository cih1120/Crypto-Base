import CryptoPriceDisplay from '@/components/CryptoPriceDisplay';
import { getExchangeInfo } from '@/lib/api/exchangeInfo';

async function getSymbols() {
  const exchangeInfo = await getExchangeInfo();
  return exchangeInfo.symbols;
}

export default async function Home() {
  const exchangeInfo = await getSymbols();
  return (
    <section className="mx-auto w-4/5 max-w-5xl p-4">
      <CryptoPriceDisplay symbols={exchangeInfo} />
    </section>
  );
}
