/**
 * @file: useTravelScheduleStore.ts
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: 여행 일정 전역 관리
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import {
  ISchedule,
  ITravelScheduleState,
  ITravelScheduleActions,
  ITravelScheduleGetters,
} from '@/shared/interfaces/travelScheduleStore.interface';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';
import { getTravelDayOfWeek } from '@/shared/lib/utils';

type ITravelSchduleStore = ITravelScheduleState &
  ITravelScheduleActions &
  ITravelScheduleGetters;

const initialState = {
  schedules: [],
};

export const useTravelScheduleStore = create<ITravelSchduleStore>()(
  devtools(
    immer((set, get) => ({
      /**
       * @States
       */
      schedules: initialState['schedules'],

      /**
       * @Actions
       */
      /** 일정 리스트 초기값 설정 */
      setInitSchedules: (data) =>
        set(
          (state) => {
            getTravelDayOfWeek(data.from, data.to).forEach((_day) => {
              state.schedules.push({
                day: _day.day,
                date: _day.date,
                list: [],
              });
            });
          },
          false,
          'travel/setInitSchedules',
        ),

      /** 여행 일정 추가 */
      setAddScheduleList: (data) =>
        set(
          (state) => {
            const targetSchedule = state.schedules.find(
              (schedule: ISchedule) => schedule.day === data.day.value,
            );

            if (targetSchedule) {
              // 장소 추가
              if (data.type === SCHEDULE_TYPE.PLACE) {
                data.places?.forEach((_place) => {
                  targetSchedule.list.push({
                    // TODO: (임시)
                    id: `${_place.id}-${new Date().getTime()}`,
                    type: data.type,
                    place: _place,
                    memo: data.memo,
                    time: data.time,
                  });
                });
              } else {
                // 메모 추가
                targetSchedule.list.push({
                  // TODO: (임시)
                  id: `${data.day.value}-${data.type}-${data.memo}-${new Date().getTime()}`,
                  type: data.type,
                  memo: data.memo,
                  time: data.time,
                });
              }
            }
          },
          false,
          'travel/setAddScheduleList',
        ),

      /** 여행 일정 제거 */
      setDeleteScheduleList: (data) =>
        set(
          (state) => {
            const targetSchedule = state.schedules.find(
              (schedule: ISchedule) => schedule.day === data.day,
            );

            if (targetSchedule) {
              targetSchedule.list = targetSchedule.list.filter(
                (_, index) => index !== data.index,
              );
            }
          },
          false,
          'travel/setDeleteScheduleList',
        ),

      /** 리셋 */
      reset: () => set(initialState),

      /**
       * @Getters
       */
      getTravelSchedules: () => get().schedules,
    })),
  ),
);
