import { useCheckoutSubscription } from "@/features/subscriptions/api/use-checkout-subscription";

import { Button } from "@/components/ui/button"

export const SubscriptionCheckout = () => {
  const checkoutMutation = useCheckoutSubscription();

  return (
    <Button
      onClick={() => checkoutMutation.mutate()}
      disabled={checkoutMutation.isPending}
      variant="ghost" 
      size="sm" 
    >
      Upgrade
    </Button>
  );
};
