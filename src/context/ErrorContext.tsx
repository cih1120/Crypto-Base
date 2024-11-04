'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ErrorContextType {
  error: string | null;
  setError: (error: string | null) => void;
}

export const ErrorContext = createContext<ErrorContextType>({
  error: null,
  setError: () => {},
});

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  return useContext(ErrorContext);
};
