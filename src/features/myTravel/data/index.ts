import {
  TRAVEL_TAB,
  TRAVEL_PARTNER,
  TRAVEL_STYLE,
  TRAVEL_STATUS,
} from '@/shared/types/Enum';

export const CITY_MOCK_DATA = {
  places: [
    {
      id: 'ChIJAWZKutdIZTURtdOKmJ3WltE',
      types: ['locality', 'political'],
      formattedAddress: '대한민국 대전광역시',
      addressComponents: [
        {
          longText: '대전광역시',
          shortText: '대전광역시',
          types: ['locality', 'political'],
          languageCode: 'ko',
        },
        {
          longText: '대전광역시',
          shortText: '대전광역시',
          types: ['administrative_area_level_1', 'political'],
          languageCode: 'ko',
        },
        {
          longText: '대한민국',
          shortText: 'KR',
          types: ['country', 'political'],
          languageCode: 'ko',
        },
      ],
      location: {
        latitude: 36.3577577,
        longitude: 127.3867458,
      },
      displayName: {
        text: '대전광역시',
        languageCode: 'ko',
      },
    },
    {
      id: 'ChIJ51cu8IcbXWARiRtXIothAS4',
      types: ['administrative_area_level_1', 'political'],
      formattedAddress: '일본 도쿄도',
      addressComponents: [
        {
          longText: '도쿄도',
          shortText: '도쿄도',
          types: ['administrative_area_level_1', 'political'],
          languageCode: 'ko',
        },
        {
          longText: '일본',
          shortText: 'JP',
          types: ['country', 'political'],
          languageCode: 'ko',
        },
      ],
      location: {
        latitude: 35.6764225,
        longitude: 139.650027,
      },
      displayName: {
        text: '도쿄도',
        languageCode: 'ko',
      },
    },
    {
      id: 'ChIJ4eIGNFXmAGAR5y9q5G7BW8U',
      types: ['locality', 'political'],
      formattedAddress: '일본 오사카부 오사카시',
      addressComponents: [
        {
          longText: '오사카시',
          shortText: '오사카시',
          types: ['locality', 'political'],
          languageCode: 'ko',
        },
        {
          longText: '오사카부',
          shortText: '오사카부',
          types: ['administrative_area_level_1', 'political'],
          languageCode: 'ko',
        },
        {
          longText: '일본',
          shortText: 'JP',
          types: ['country', 'political'],
          languageCode: 'ko',
        },
      ],
      location: {
        latitude: 34.6937249,
        longitude: 135.5022535,
      },
      displayName: {
        text: '오사카시',
        languageCode: 'ko',
      },
    },
    {
      id: 'ChIJP3Sa8ziYEmsRUKgyFmh9AQM',
      types: ['colloquial_area', 'locality', 'political'],
      formattedAddress: '오스트레일리아 뉴사우스웨일스 주 시드니',
      addressComponents: [
        {
          longText: '시드니',
          shortText: '시드니',
          types: ['colloquial_area', 'locality', 'political'],
          languageCode: 'ko',
        },
        {
          longText: '뉴사우스웨일스 주',
          shortText: 'NSW',
          types: ['administrative_area_level_1', 'political'],
          languageCode: 'ko',
        },
        {
          longText: '오스트레일리아',
          shortText: 'AU',
          types: ['country', 'political'],
          languageCode: 'ko',
        },
      ],
      location: {
        latitude: -33.8622503,
        longitude: 151.207684,
      },
      displayName: {
        text: '시드니',
        languageCode: 'ko',
      },
    },
  ],
};

/** 여행 일정 mockup data */
export const TRAVEL_DETAIL_MOCK_DATA = {
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
  schedule: [
    {
      day: 1,
      date: 'Mon May 04 2026 00:00:00 GMT+0900',
      places: [
        {
          id: 1,
          type: 'place',
          name: '아사쿠사 규카츠',
          latlng: {
            lat: 0,
            lng: 0,
          },
          placeMemo: null,
          time: null,
        },
        {
          id: 2,
          type: 'memo',
          name: null,
          memo: '약국에서 약 사기!',
          latlng: null,
          placeMemo: null,
          time: null,
        },
        {
          id: 3,
          type: 'place',
          name: '센소지',
          latlng: {
            lat: 0,
            lng: 0,
          },
          placeMemo: null,
          time: null,
        },
      ],
    },
    {
      day: 2,
      date: 'Mon May 05 2026 00:00:00 GMT+0900',
      places: null,
    },
    {
      day: 3,
      date: 'Mon May 06 2026 00:00:00 GMT+0900',
      places: null,
    },
    {
      day: 4,
      date: 'Mon May 07 2026 00:00:00 GMT+0900',
      places: null,
    },
  ],
  image: null,
};
