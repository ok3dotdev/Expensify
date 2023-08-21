'use client';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useUser() {
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR('/api/user', fetcher);

  const error = userError;
  const isLoading = userIsLoading;

  return {
    userData,
    error,
    isLoading,
  };
}
