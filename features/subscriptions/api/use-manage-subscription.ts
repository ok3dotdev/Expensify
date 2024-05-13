import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.subscriptions.portal.$post>;

export const useManageSubscription = () => {
  const mutation = useMutation<
    ResponseType,
    Error
  >({
    mutationFn: async () => {
      const response = await client.api.subscriptions.portal.$post();
      return await response.json();
    },
    onSuccess: ({ data }) => {
      window.location.href = data;
    },
    onError: () => {
      toast.error("Failed to create portal");
    }
  });

  return mutation;
};
