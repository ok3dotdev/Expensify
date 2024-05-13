import { useSearchParams } from "next/navigation";

export const useGetPeriod = () => {
  const params = useSearchParams();
  
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  return { 
    to,
    from,
  };
};
