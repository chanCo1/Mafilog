/**
 * @file: GlobalAddPlaceModal.tsx
 * @author: chad
 * @since: 2026.06.04 ~
 * @description: 전역 상태로 관리할 장소 추가 모달
 */

import { useAddPlaceModalStore } from '@/shared/stores/useAddPlaceModalStore';
import AddPlaceModal from '@/features/myTravel/components/modal/AddPlaceModal';

export default function GlobalAddPlaceModal() {
  const { isOpen, hasMounted, scheduleList, close } = useAddPlaceModalStore();

  if (!hasMounted) return null;

  return (
    <AddPlaceModal
      isOpen={isOpen}
      handleClose={close}
      scheduleList={scheduleList}
    />
  );
}