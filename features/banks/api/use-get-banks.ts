import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export const useGetBanks = () => {
  const query = useQuery({
    queryKey: ['banks'],
    queryFn: async () => {
      const response = await client.api.banks.$get();

      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
