import { TriangleAlert } from "lucide-react";

import { useOpenTransaction } from "@/features/transactions/store/use-open-transaction";

import { useOpenAccount } from "@/features/accounts/store/use-open-account";

import { cn } from "@/lib/utils";

type Props = {
  id: string;
  account: string | null;
  accountId: string | null;
}

export const AccountColumn = ({
  id,
  account,
  accountId,
}: Props) => {
  const { onOpen: onOpenTransaction } = useOpenTransaction();
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => {
    if (accountId) {
      onOpenAccount(accountId);
    } else {
      onOpenTransaction(id);
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !account && "text-rose-500"
      )}>
      {!account && <TriangleAlert className="mr-2 h-4 w-4 shrink-0" />}
      {account || "Uncategorized"}
    </div>
  );
};
