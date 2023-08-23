'use client';
import Greetings from '@/components/Greetings';
import { NewCard } from '@/components/NewCard';
import Summary from '@/components/Summary';
import { Button } from '@/components/ui/button';

const syncTransactions = async () => {
  const res = await fetch('/api/transactions/sync');
  const data = await res.json();
  console.log(data);
};

export default function page() {
  return (
    <div className="p-6 w-full gap-y-6 ml-12 bg-black text-white" suppressHydrationWarning>
      <Greetings/>
      <Summary />
      <NewCard />
    </div>
  );
}
