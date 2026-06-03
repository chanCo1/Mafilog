/**
 * @file: useMemoryDetailStore.tsx
 * @author: chad
 * @since: 2026.06.04 ~
 * @description: 추억 상세 구글맵 비용 절감을 위한 모달 전역 상태 관리
 */

import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  hasMounted: boolean;
  selectedMemoryId: number;
  handleUpdate: (() => void) | undefined;
  selectedMapType: string | undefined;
  open: (
    memoryId: number,
    mapType: string | undefined,
    handleUpdate: () => void,
  ) => void;
  close: () => void;
  setSelectedMemoryId: (id: number) => void;
}

export const useMemoryDetailStore = create<ModalState>((set) => ({
  isOpen: false,
  hasMounted: false,
  selectedMemoryId: 0,
  selectedMapType: undefined,
  handleUpdate: undefined,
  open: (memoryId, mapType, handleUpdate) =>
    set({
      isOpen: true,
      hasMounted: true,
      selectedMemoryId: memoryId,
      selectedMapType: mapType,
      handleUpdate,
    }),
  close: () =>
    set({ isOpen: false, selectedMemoryId: 0, handleUpdate: undefined }),
  setSelectedMemoryId: (id) => set({ selectedMemoryId: id }),
}));

// isOpen={isOpenDetailModal}
//       handleClose={() => setIsOpenDetailModal(false)}
//       selectedMemoryId={selectedMemoryId}
//       setSelectedMemoryId={setSelectedMemoryId}
//       selectedMapType={selectedMapType.value as string}
//       handleUpdate={handleUpdateMemoryDetail}
