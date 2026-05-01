import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import {
  ITravelState,
  ISchedule,
  ITravelActions,
  ITravelGetters,
} from '@/shared/interfaces';

type ITravelStore = ITravelState & ITravelActions & ITravelGetters;

export const useTravelStore = create<ITravelStore>()(
  devtools(
    immer((set, get) => ({
      /**
       * @States
       */
      travelInfo: {
        id: 0,
        title: '',
        from: null,
        to: null,
        travelPeriod: 0,
        travelStyles: [],
        travelPartner: '',
        cities: [],
      },
      schedules: [],
      expenses: [],

      /**
       * @Actions
       */

      /** 여행 초기값 설정 */
      setInitTravel: (data) =>
        set({ travelInfo: data }, false, 'travel/setInitTravel'),

      /** 여행 일정 추가 */
      setAddScheduleList: (data) =>
        set(
          (state) => {
            const targetSchedule = state.schedules.find(
              (schedule: ISchedule) => schedule.day === data.day,
            );

            if (targetSchedule) {
              targetSchedule.list.push(...data.list);
            }
          },
          false,
          'travel/setAddScheduleList',
        ),

      /** 여행 일정 제거 */
      setDeleteScheduleList: (id) => set((state) => {}),

      /**
       * @Getters
       */
    })),
  ),
);
