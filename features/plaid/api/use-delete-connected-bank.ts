import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.plaid["connected-bank"]["$delete"]>;

export const useDeleteConnectedBank = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error
  >(
    {
    mutationFn: async () => {
      const response = await client.api.plaid["connected-bank"]["$delete"]();
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Connected bank deleted");
      queryClient.invalidateQueries({ queryKey: ["connected-bank"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Failed to delete connected bank");
    }
  });

  return mutation;
};
