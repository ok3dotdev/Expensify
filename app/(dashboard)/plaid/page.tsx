'use client';
import Greetings from '@/components/Greetings';
import { Button } from '@/components/ui/button';

const refreshTransactions = async () => {
  const response = await fetch('/api/transactions/sync', {
    method: 'GET',
    cache: 'no-store',
  });
};

export default function page() {
  return (
    <div className="p-6 w-full gap-y-6">
      <Greetings />

      <Button className="mt-6" onClick={refreshTransactions}>
        Refresh
      </Button>
    </div>
  );
}
