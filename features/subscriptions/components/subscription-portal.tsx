import { useManageSubscription } from "@/features/subscriptions/api/use-manage-subscription";

import { Button } from "@/components/ui/button"

export const SubscriptionPortal = () => {
  const manageMutation = useManageSubscription();

  return (
    <Button
      onClick={() => manageMutation.mutate()}
      disabled={manageMutation.isPending}
      variant="ghost" 
      size="sm" 
    >
      Manage Subscription
    </Button>
  );
};
