/**
 * @file: useMutateMyTravelList.ts
 * @author: chad
 * @since: 2026.05.18 ~
 * @description: 새 여행 생성 Mutation 및 캐시 새로고침
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';
import { toast } from 'sonner';

export const useMutateMyTravelList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await MyTravelService.postCreateTravel(formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myTravelList'],
      });
      
      toast.success('새 여행을 만들었어요');
    },
    
    onError: (error) => {
      console.error('여행 생성 실패:', error);
      toast.error('여행을 생성하는 중 오류가 발생했습니다.');
    },
  })
}