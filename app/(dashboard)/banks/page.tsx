'use client';
import { Loader2, Plus } from 'lucide-react';

import { useGetBanks } from '@/features/banks/api/use-get-banks';
import { useBulkDeleteBanks } from '@/features/banks/api/use-bulk-delete-banks';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/data-table';

import { columns } from './columns';
import { Button } from '@/components/ui/button';

const BankPage = () => {
  const banksQuery = useGetBanks();
  const deleteBanks = useBulkDeleteBanks();

  const banks = banksQuery.data || [];

  const isDisabled = banksQuery.isLoading;

  if (banksQuery.isLoading) {
    return (
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader>
            <Skeleton className='h-8 w-48' />
          </CardHeader>
          <CardContent>
            <div className='h-[500px] w-full flex items-center justify-center'>
              <Loader2 className='h-6 w-6 text-slate-300 animate-spin' />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>Banks</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            disabled={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteBanks.mutate({ ids });
            }}
            filterKey='name'
            columns={columns}
            data={banks}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BankPage;
