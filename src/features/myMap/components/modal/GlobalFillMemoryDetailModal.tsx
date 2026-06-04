/**
 * @file: GlobalFillMemoryDetailModal.tsx
 * @author: chad
 * @since: 2026.06.04 ~
 * @description: 전역 상태로 관리할 추억 상세 모달
 */

import { useMemoryDetailStore } from '@/shared/stores/useMemoryDetailStore';
import FillMemoryDetailModal from '@/features/myMap/components/modal/FillMemoryDetailModal';

export default function GlobalFillMemoryDetailModal() {
  const {
    isOpen,
    hasMounted,
    selectedMemoryId,
    selectedMapType,
    close,
    setSelectedMemoryId,
    handleUpdate,
  } = useMemoryDetailStore();

  if (!hasMounted) return null;

  return (
    <FillMemoryDetailModal
      isOpen={isOpen}
      handleClose={close}
      selectedMemoryId={selectedMemoryId}
      setSelectedMemoryId={setSelectedMemoryId}
      selectedMapType={selectedMapType}
      handleUpdate={handleUpdate}
    />
  );
}
