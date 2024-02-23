import { fetchItems } from "../../../../services/itemService";

import { useQuery } from '@tanstack/react-query';

export const useGetItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });
}
