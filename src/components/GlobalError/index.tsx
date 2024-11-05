'use client';

import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useError } from '@/context/ErrorContext';

import ErrorDialog from './ErrorDialog';

function GlobalError() {
  const { error, setError } = useError();

  useEffect(() => {
    if (error) {
      const errorMessage =
        process.env.NODE_ENV === 'production'
          ? error.toString()
          : 'An unexpected error occurred. Please try again later.';

      if (isDialogError(errorMessage)) {
        return;
      } else {
        toast.error(errorMessage);
        setError(null);
      }
    }
  }, [error]);

  const isDialogError = (message: string) => {
    return message.includes('429') || message.includes('451');
  };

  return error && isDialogError(error.toString()) ? (
    <ErrorDialog error={error.toString()} />
  ) : null;
}

export default GlobalError;
