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
        set(
          (state) => {
            const addStatusData = data.map((_data) => {
              // 프론트에서만 사용할 status 데이터 삽입
              return { ..._data, status: null };
            });
            state.checkList = addStatusData;
          },
          false,
          'checklist/setInitCheckList',
        ),

      /** 카테고리 상태 변경 */
      setChangeCategoryStatus: (target, status) =>
        set(
          (state) => {
            const findCategory = state.checkList.find(
              (list) => list.id === target.id,
            );

            if (findCategory) {
              findCategory.status = status;
            }
          },
          false,
          'checklist/setChangeCategoryStatus',
        ),

      /** 카테고리 추가 */
      setAddCategory: (name) =>
        set(
          (status) => {
            status.checkList.push({
              id: `${name}-${Math.floor(Math.random() * 1000)}`,
              label: name,
              status: null,
              list: [],
            });
          },
          false,
          'checklist/setUpdateCategoryName',
        ),

      /** 카테고리명 수정 */
      setUpdateCategoryName: (target, name) =>
        set(
          (state) => {
            const findCategory = state.checkList.find(
              (list) => list.id === target.id,
            );

            if (findCategory) {
              findCategory.label = name;
            }
          },
          false,
          'checklist/setUpdateCategoryName',
        ),

      /** 카테고리 삭제 */
      setDeleteCategory: (target) =>
        set(
          (state) => {
            state.checkList = state.checkList.filter(
              (list) => list.id !== target.id,
            );
          },
          false,
          'checklist/setDeleteCategory',
        ),

      /** 준비물 추가 */
      setAddItem: (target, name) =>
        set(
          (state) => {
            const findCategory = state.checkList.find(
              (list) => list.id === target.id,
            );

            if (findCategory) {
              findCategory.list.push({
                id: `${name}-${Math.floor(Math.random() * 1000)}`,
                label: name,
                isChecked: false,
              });
            }
          },
          false,
          'checklist/setAddItem',
        ),

      /** 리셋 */
      reset: () => set(initialState),

      /**
       * @Getters
       */
      getCheckList: () => get().checkList,
    })),
    { name: 'checkList' },
  ),
);
