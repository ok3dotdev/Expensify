import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export const useGetBanks = (id?: string) => {
  const query = useQuery({
    queryKey: ['banks', { id }],
    queryFn: async () => {
      const response = await client.api.banks[':id'].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch banks');
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
