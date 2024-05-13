import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-modal";
import { useCheckoutSubscription } from "@/features/subscriptions/api/use-checkout-subscription";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export const SubscriptionModal = () => {
  const checkoutMutation = useCheckoutSubscription();
  const { isOpen, onClose } = useSubscriptionModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo-dark.svg" alt="Logo" width={36} height={36} />
          <DialogTitle className="text-center">
            Upgrade to a paid plan
          </DialogTitle>
          <DialogDescription className="text-center">
            Upgrade to a paid plan to unlock more features.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">
              Bank account syncing
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">
              Upload CSV files
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">
              Different chart types
            </p>
          </li>
        </ul>
        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            className="w-full"
            disabled={checkoutMutation.isPending} 
            onClick={() => checkoutMutation.mutate()}
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
