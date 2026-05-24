/**
 * @file: useGetTravelId.ts
 * @author: chad
 * @since: 2026.05.20 ~
 * @description: url에서 travelId 값 구하는 훅
 */

import { useParams } from 'next/navigation';

export const useGetTravelId = () => {
  const params = useParams();
  
  return (params?.travelId || '') as string; 
};