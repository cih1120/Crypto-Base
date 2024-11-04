import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';

import { ErrorProvider } from '@/context/ErrorContext';

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ErrorProvider>
      <Toaster position="bottom-center" />
      {children}
    </ErrorProvider>
  );
}
