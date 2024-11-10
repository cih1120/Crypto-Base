'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useError } from '@/context/ErrorContext';

import ErrorDialog from './ErrorDialog';

const ErrorStrategy = {
  '429': () => (
    <ErrorDialog error="Too many requests. Please try again later." />
  ),
  '451': () => (
    <ErrorDialog error="Your region does not support this service. Please try again later." />
  ),
  default: () => {
    toast.error('An unexpected error occurred. Please try again later.');
    return null;
  },
};

function GlobalError() {
  const { error, setError } = useError();
  const [result, setResult] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (error) {
      const statusCode = error.status?.toString() || 'default';
      const handleError =
        ErrorStrategy[statusCode as keyof typeof ErrorStrategy] ||
        ErrorStrategy.default;

      const newResult = handleError();
      setResult(newResult);

      if (!newResult) {
        setError(null);
      }
    }
  }, [error, setError]);

  return result;
}

export default GlobalError;
