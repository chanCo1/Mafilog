import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import {
  ITravelState,
  ISchedule,
  ITravelActions,
  ITravelGetters,
} from '@/shared/interfaces';
import {
  TRAVEL_STATUS,
  TRAVEL_STYLE,
  TRAVEL_PARTNER,
  SCHEDULE_TYPE,
} from '@/shared/types/Enum';
import { getTravelDayOfWeek } from '@/shared/lib/utils';

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

      /** 가계부 리스트 초기값 설정 */
      setInitExpeneses: (data) =>
        set(
          (state) => {
            getTravelDayOfWeek(data.from, data.to).forEach((_day) => {
              state.expenses.push({
                day: _day.day,
                date: _day.date,
                list: [],
                dailyExpenses: 0,
              });
            });
          },
          false,
          'travel/setInitExpeneses',
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
                    type: data.type,
                    place: _place,
                    memo: data.memo,
                    time: data.time,
                  });
                });
              } else {
                // 메모 추가
                targetSchedule.list.push({
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
      setDeleteScheduleList: (id) => set((state) => {}),
      /** 리셋 */
      reset: () => set(initialState),

      /**
       * @Getters
       */
      getTravelInfo: () => get().travelInfo,
    })),
  ),
);
