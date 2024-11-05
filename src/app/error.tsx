'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      router.push('/global');
    } else {
      console.error(error);
    }
  }, [error, router]);

  return null;
}
