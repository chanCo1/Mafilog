/**
 * @file: useGetMemoryList.ts
 * @author: chad
 * @since: 2026.05.26 ~
 * @description: 추억 리스트 조회
 */

import { useQuery } from '@tanstack/react-query';
import { memoryKeys } from '@/features/myMap/hooks/rquery/queryKeys';
import MemoryService from '@/features/myMap/services/Memory.service';

export const useGetMemoryList = (mapType: string) => {
  const queryKey = memoryKeys.list(mapType);

  const query = useQuery({
    queryKey,
    queryFn: async () => await MemoryService.getMemoryList({ mapType }),
    enabled: !!mapType,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    data: query.data,
  };
};
