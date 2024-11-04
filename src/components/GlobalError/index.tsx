'use client';

import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useError } from '@/context/ErrorContext';

import Error429Dialog from './429Dialog';

function GlobalError() {
  const { error, setError } = useError();

  useEffect(() => {
    if (error && !error.includes('429')) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return error && error.includes('429') ? <Error429Dialog /> : null;
}

export default GlobalError;
