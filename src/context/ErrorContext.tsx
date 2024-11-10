'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { IApiResponse } from '@/lib/api';

interface ErrorContextType {
  error: IApiResponse<any> | null;
  setError: (error: IApiResponse<any> | null) => void;
}

export const ErrorContext = createContext<ErrorContextType>({
  error: null,
  setError: () => {},
});

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<IApiResponse<any> | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  return useContext(ErrorContext);
};
