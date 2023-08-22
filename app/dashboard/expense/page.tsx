import { useTransactions } from '@/components/context/transactions-provider';
import { Transaction, columns } from './columns';
import { DataTable } from './data-table';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';

async function getData() {
  const { userId } = auth();
  if (!userId) {
    throw new Error('No user ID found');
  }
  const transactions = await db.transactions.findMany({
    where: {
      userId,
    },
  });

  if (!transactions) {
    throw new Error('No transactions found');
  }
  return { transactions };
}

export default async function page() {
  const { transactions } = await getData();
  return (
    <div className="w-full ml-12">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={transactions} />
      </div>
    </div>
  );
}
