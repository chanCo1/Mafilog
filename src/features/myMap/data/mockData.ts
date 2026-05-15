import {
  TRAVEL_STYLE,
  TRAVEL_PARTNER,
  TRAVEL_STATUS,
  SCHEDULE_TYPE
} from '@/shared/types/Enum';

/** 여행 일정 mockup data */
export const MAP_MOCK_DATA = {
  id: 1,
  title: '부산광역시, 도쿄도, 오사카시 여행',
  from: new Date('Mon Apr 27 2026 11:56:35 GMT+0900'),
  to: new Date('Sun may 3 2026 00:00:00 GMT+0900'),
  status: 'progress' as TRAVEL_STATUS,
  travelPartner: 'lover' as TRAVEL_PARTNER,
  travelStyles: ['heal', 'food', 'activity'] as TRAVEL_STYLE[],
  cities: [
    {
      id: 'ChIJAWZKutdIZTURtdOKmJ3WltE',
      types: ['locality', 'political'],
      address: '대한민국 대전광역시',
      country: { name: '대한민국', code: 'KR' },
      location: { lat: 36.3577577, lng: 127.3867458 },
      name: '대전광역시',
      timezone: 'Asia/Seoul',
    },
    {
      id: 'ChIJ51cu8IcbXWARiRtXIothAS4',
      types: ['administrative_area_level_1', 'political'],
      address: '일본 도쿄도',
      country: { name: '일본', code: 'JP' },
      location: { lat: 35.6764225, lng: 139.650027 },
      name: '도쿄도',
      timezone: 'Asia/Tokyo',
    },
    {
      id: 'ChIJ4eIGNFXmAGAR5y9q5G7BW8U',
      types: ['locality', 'political'],
      address: '일본 오사카부 오사카시',
      country: { name: '일본', code: 'JP' },
      location: { lat: 34.6937249, lng: 135.5022535 },
      name: '오사카시',
      timezone: 'Asia/Tokyo',
    },
    {
      id: 'ChIJP3Sa8ziYEmsRUKgyFmh9AQM',
      types: ['colloquial_area', 'locality', 'political'],
      address: '오스트레일리아 뉴사우스웨일스 주 시드니',
      country: { name: '오스트레일리아', code: 'AU' },
      location: { lat: -33.8622503, lng: 151.207684 },
      name: '시드니',
      timezone: 'Australia/Sydney',
    },
  ],
  member: [
    { id: 'mflid-1', name: '나' },
    { id: 'mflid-2', name: '같이간친구A' },
    { id: 'mflid-3', name: '같이간친구B' },
  ],
  schedules: [
    {
      day: 1,
      date: 'Mon May 04 2026 00:00:00 GMT+0900',
      list: [
        {
          id: 'pJj0z16k3NzVllQLLIamT',
          type: 'place' as SCHEDULE_TYPE,
          place: {
            id: 'ChIJvxmBpT1EezURi3hdBqFx8fA',
            name: '동탄센트럴파크',
            address: '대한민국 화성시',
            country: {
              name: '대한민국',
              code: 'KR',
            },
            location: {
              lat: 37.2051082,
              lng: 127.0634991,
            },
            types: ['park', 'point_of_interest', 'establishment'],
          },
          day: {
            label: '1일차 04월 27일 (월)',
            value: 1,
          },
          memo: '',
          time: '',
        },
        {
          id: '80zPOdFsvBLtGSFvux-xi',
          type: 'memo' as SCHEDULE_TYPE,
          name: null,
          place: null,
          day: {
            label: '1일차 04월 27일 (월)',
            value: 1,
          },
          memo: '약국에서 약 사기!',
          time: '',
        },
        {
          id: 'AWTsG2LgVL1LjryNjlFGY',
          type: 'place' as SCHEDULE_TYPE,
          place: {
            id: 'ChIJZf3G_j1EezURYEMK3YrPprc',
            name: '인생돈가스',
            address: '경기도 화성시 동탄공원로3길 14-13',
            country: {
              name: '대한민국',
              code: 'KR',
            },
            location: {
              lat: 37.2074006,
              lng: 127.06174069999997,
            },
            types: [
              'tonkatsu_restaurant',
              'japanese_restaurant',
              'restaurant',
              'food',
              'point_of_interest',
              'establishment',
            ],
          },
          day: {
            label: '1일차 04월 27일 (월)',
            value: 1,
          },
          memo: '',
          time: '',
        },
      ],
    },
    {
      day: 2,
      date: 'Mon May 05 2026 00:00:00 GMT+0900',
      list: [
        {
          id: 'izBUzAnRhwBD_Y8vtGKYw',
          type: 'place' as SCHEDULE_TYPE,
          place: {
            id: 'ChIJdRtnobCwfDUR2MlxMFi-y0E',
            name: '바야바',
            address: '경기도 구리시 수택동 409-11번지 제이에스타운 103호 KR',
            country: {
              name: '대한민국',
              code: 'KR',
            },
            location: {
              lat: 37.5994801,
              lng: 127.14084269999998,
            },
            types: ['bar', 'point_of_interest', 'establishment'],
          },
          day: {
            label: '2일차 04월 28일 (화)',
            value: 2,
          },
          memo: '',
          time: '',
        },
        {
          id: '80zPOdFsvBLtGSFvux-xi',
          type: 'memo' as SCHEDULE_TYPE,
          name: null,
          place: null,
          day: {
            label: '2일차 04월 28일 (화)',
            value: 2,
          },
          memo: '약국에서 약 사기!222222222',
          time: '',
        },
        {
          id: 'c6_oZrqF-0SK1K8Cd9-f5',
          type: 'place' as SCHEDULE_TYPE,
          place: {
            id: 'ChIJTxjp4s0DZzUR80IkmhcJMxI',
            name: 'THE 신촌`s 덮죽',
            address: '경상북도 포항시 북구 중앙로294번길 10-7',
            country: {
              name: '대한민국',
              code: 'KR',
            },
            location: {
              lat: 36.0387305,
              lng: 129.3671622,
            },
            types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
          },
          day: {
            label: '2일차 04월 28일 (화)',
            value: 2,
          },
          memo: '',
          time: '',
        },
      ],
    },
    {
      day: 3,
      date: 'Mon May 06 2026 00:00:00 GMT+0900',
      list: [],
    },
    {
      day: 4,
      date: 'Mon May 07 2026 00:00:00 GMT+0900',
      list: [],
    },
  ],
  image: null,
};
