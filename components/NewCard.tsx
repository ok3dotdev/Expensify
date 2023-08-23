'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/util';
import { useTransactions } from '@/components/context/transactions-provider';
import { PieChart } from 'react-minimal-pie-chart';

export function NewCard({ className, ...props }: any) {
  const { transactionData, error, isLoading } = useTransactions(
    '2023-08-19',
    '2023-03-01',
  );
  // TODO: Add error handling
  //erro handling
  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const transactions = transactionData.transactions.slice(0, 7);
  //loading
  return (
    <div className="px-8 mt-5 grid grid-cols">
      <div>
        <PieChart
          data={[
            { title: 'One', value: 10, color: '#E38627' },
            { title: 'Two', value: 15, color: '#C13C37' },
            { title: 'Three', value: 20, color: '#6A2135' },
          ]}
        />
        ;
      </div>
      <table className="table-auto rounded-md">
        <thead className="border rounded">
          <tr className="border">
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Merchant</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{transaction.name}</td>
              <td className="border px-4 py-2">${transaction.amount}</td>
              <td className="border px-4 py-2">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
