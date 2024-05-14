'use client';

import { useState } from 'react';
import { useMount } from 'react-use';
import { usePlaidLink } from 'react-plaid-link';

import { useCreateLinkToken } from '@/features/plaid/api/use-create-link-token';
import { useExchangePublicToken } from '@/features/plaid/api/use-exchange-public-token';

import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';

import { Button } from '@/components/ui/button';
import { useGetBanks } from '@/features/banks/api/use-get-banks';

export const PlaidConnect = () => {
  const [token, setToken] = useState<string | null>(null);
  const banksQuery = useGetBanks();

  const banks = banksQuery.data || [];

  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

  const createLinkTokenMutation = useCreateLinkToken();
  const exchangePublicTokenMutation = useExchangePublicToken();

  useMount(() => {
    createLinkTokenMutation.mutate(undefined, {
      onSuccess: ({ data }) => {
        setToken(data.link_token);
      },
    });
  });

  const plaid = usePlaidLink({
    token: token,
    onSuccess: (publicToken) => {
      exchangePublicTokenMutation.mutate({
        publicToken,
      });
    },
    env: 'development',
  });

  const onClick = () => {
    // if (shouldBlock) {
    //   triggerPaywall();
    //   return;
    // }

    if (plaid.ready) {
      plaid.open();
    }
  };

  const isDisabled =
    !plaid.ready ||
    exchangePublicTokenMutation.isPending ||
    isLoading ||
    banksQuery.isLoading;

  return (
    <Button onClick={onClick} disabled={isDisabled} variant='ghost' size='sm'>
      {banks.length ? 'Add New Bank' : 'Connect Bank'}
    </Button>
  );
};
