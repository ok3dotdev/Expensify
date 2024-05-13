"use client";

import { Loader2, Plus } from "lucide-react";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccount } from "@/features/accounts/store/use-new-account";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";

import { columns } from "./columns";
import { Button } from "@/components/ui/button";

const AccountsPage = () => {
  const newAccount = useNewAccount();
  const deleteAccounts = useBulkDeleteAccounts();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const isDisabled =
    accountsQuery.isLoading || 
    deleteAccounts.isPending;

  if (accountsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Accounts
        </CardTitle>
        <Button onClick={newAccount.onOpen} size="sm" className="w-full lg:w-auto">
          <Plus className="size-4 mr-2" />
          Add new
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          disabled={isDisabled}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteAccounts.mutate({ ids });
          }}
          filterKey="name" 
          columns={columns} 
          data={accounts}
        />
      </CardContent>
      </Card>
    </div>
  );
};
 
export default AccountsPage;
