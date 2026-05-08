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
import { nanoid } from 'nanoid';

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
            const newSchedules = getTravelDayOfWeek(data.from, data.to).map(
              (_day) => ({
                day: _day.day,
                date: _day.date,
                list: [],
              }),
            );

            state.schedules = newSchedules;
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
                    id: nanoid(),
                    type: data.type,
                    place: _place,
                    memo: data.memo,
                    time: data.time,
                    day: data.day,
                  });
                });
              } else {
                // 메모 추가
                targetSchedule.list.push({
                  // TODO: (임시)
                  id: nanoid(),
                  type: data.type,
                  memo: data.memo,
                  time: data.time,
                  day: data.day,
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
                (list) => list.id !== data.id,
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
    { name: 'schedules' },
  ),
);
