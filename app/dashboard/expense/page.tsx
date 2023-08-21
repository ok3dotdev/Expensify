import { Payment, columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ];
}

export default function page() {
  const data = await getData();
  return (
    <div className="w-full ml-12">
      <h1>home</h1>
    </div>
  );
}
