'use client';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useTransactions(to: string, from: string) {
  // console.log(to, from);
  //Transaction Data
  const endpoint = `api/transactions/list${
    to && from ? `?to=${to}&from=${from}` : ''
  }`;
  // const endpoint = 'api/transactions/list?from=2023-03-01&to=2023-08-19';
  const {
    data: transactionData,
    error: transactionError,
    isLoading: transactionsIsLoading,
  } = useSWR(endpoint, fetcher);

  const error = transactionError;
  const isLoading = transactionsIsLoading;

  return {
    transactionData,
    error,
    isLoading,
  };
}
