'use client';

import { useContext } from 'react';

import { ErrorContext } from '@/context/ErrorContext';

export const useError = () => {
  const context = useContext(ErrorContext);
  return context;
};
