/**
 * @file: useTravelInfoStore.ts
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: 여행 정보 전역 관리
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import {
  ITravelInfoState,
  ITravelInfoActions,
  ITravelInfoGetters,
} from '@/shared/interfaces/travelInfoStore.interface';
import {
  TRAVEL_STATUS,
  TRAVEL_STYLE,
  TRAVEL_PARTNER,
} from '@/shared/types/Enum';
import { getTravelDay } from '@/shared/lib/utils';

type ITravelInfoStore = ITravelInfoState &
  ITravelInfoActions &
  ITravelInfoGetters;

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
    member: [],
    dayRange: 0,
  },
};

export const useTravelInfoStore = create<ITravelInfoStore>()(
  devtools(
    immer((set, get) => ({
      /**
       * @States
       */
      travelInfo: initialState['travelInfo'],

      /**
       * @Actions
       */
      /** 여행 초기값 설정 */
      setInitTravelInfo: (data) =>
        set(
          (state) => {
            state.travelInfo = {
              ...data,
            };
          },
          false,
          'travel/setInitTravel',
        ),

      /** 리셋 */
      reset: () => set(initialState),

      /**
       * @Getters
       */
      getTravelInfo: () => get().travelInfo,
    })),
    { name: 'travelInfo' },
  ),
);
