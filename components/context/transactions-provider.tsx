'use client';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useTransactions() {
  //Transaction Data
  const {
    data: transactionData,
    error: transactionError,
    isLoading: transactionsIsLoading,
  } = useSWR('/transactions/list', fetcher);

  const error = transactionError;
  const isLoading = transactionsIsLoading;

  return {
    transactionData,
    error,
    isLoading,
  };
}
