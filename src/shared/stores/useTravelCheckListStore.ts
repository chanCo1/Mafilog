/**
 * @file: useTravelCheckListStore.ts
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: 여행 체크리스트 전역 관리
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import {
  ITravelCheckListState,
  ITravelCheckListActions,
  ITravelCheckListGetters,
} from '@/shared/interfaces/travelCheckListStore.interface';

type ITravelCheckListStore = ITravelCheckListState &
  ITravelCheckListActions &
  ITravelCheckListGetters;

const initialState = {
  checkList: [],
};

export const useTravelCheckListStore = create<ITravelCheckListStore>()(
  devtools(
    immer((set, get) => ({
      /**
       * @States
       */
      checkList: initialState['checkList'],

      /**
       * @Actions
       */
      /** 여행 초기값 설정 */
      setInitCheckList: (data) =>
        set({ checkList: data }, false, 'checklist/setInitCheckList'),
      /** 리셋 */
      reset: () => set(initialState),

      /**
       * @Getters
       */
      getCheckList: () => get().checkList,
    })),
  ),
);
