'use client';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useOverView() {
  const {
    data: accountsData,
    error: accountsError,
    isLoading: accountsIsLoading,
  } = useSWR('/api/accounts', fetcher);
  // Bank data
  const {
    data: bankData,
    error: bankError,
    isLoading: bankIsLoading,
  } = useSWR('/api/banks', fetcher);

  const allData = {
    accountsData,
    bankData,
  };

  const error = accountsError;
  const isLoading = accountsIsLoading;
  return {
    allData,
    error,
    isLoading,
  };
}
