import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import {
  ITravelState,
  ISchedule,
  ITravelActions,
  ITravelGetters,
} from '@/shared/interfaces';
import { TRAVEL_STATUS, TRAVEL_STYLE, TRAVEL_PARTNER } from '@/shared/types/Enum';

type ITravelStore = ITravelState & ITravelActions & ITravelGetters;

const initialState = {
  travelInfo: {
    id: 0,
    title: '',
    from: new Date(),
    to: new Date(),
    status: TRAVEL_STATUS.UPCOMING,
    travelPeriod: 0,
    travelStyles: [TRAVEL_STYLE.HEAL],
    travelPartner: TRAVEL_PARTNER.ALONE,
    cities: [],
  },
  schedules: [],
  expenses: [],
};

export const useTravelStore = create<ITravelStore>()(
  devtools(
    immer((set, get) => ({
      /**
       * @States
       */
      travelInfo: initialState['travelInfo'],
      schedules: initialState['schedules'],
      expenses: initialState['expenses'],

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
      /** 리셋 */
      reset: () => set(initialState),

      /**
       * @Getters
       */
    })),
  ),
);
