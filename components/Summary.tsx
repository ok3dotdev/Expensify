'use client';
import { useOverView } from '@/components/context/summary-provider';

export default function Summary() {
  const { allData, error, isLoading } = useOverView();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  const { accountsData, bankData } = allData;
  const totlaAccounts = accountsData?.accounts.length;
  const totlaAbccounts = bankData?.banks.length;

  return (
    <div className="flex flex-col px-8">
      <h3>Summary</h3>
      <div className="flex flex-row gap-x-9 mt-2">
        <div className="flex flex-col gap-y-4 border-gray-500 border p-4 rounded-md">
          <div className="flex flex-col">
            <div className="text-gray-500">Bank(s) Connected</div>
            <div className="text-4xl font-bold">{totlaAbccounts}</div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 border-gray-500 border p-4 rounded-md">
          <div className="flex flex-col">
            <div className="text-gray-500">Total Accounts</div>
            <div className="text-4xl font-bold">{totlaAccounts}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
