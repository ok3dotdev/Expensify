"use client";

import { useDeleteConnectedBank } from "@/features/plaid/api/use-delete-connected-bank";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";

export const PlaidDisconnect = () => {
  const [Dialog, confirm] = useConfirm(
    "Are you sure?",
    "This will disconnect your bank account, and remove all associated data.",
  );

  const mutation = useDeleteConnectedBank();

  const onClick = async () => {
    const ok = await confirm();

    if (ok) {
      mutation.mutate();
    }
  };

  return (
    <>
      <Dialog />
      <Button
        onClick={onClick}
        disabled={mutation.isPending}
        variant="ghost" 
        size="sm" 
      >
        Disconnect
      </Button>
    </>
  );
};
