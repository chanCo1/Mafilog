import { getPlaceCategory, convertComma, convertCategory } from '@/shared/lib/utils';

describe('장소 카테고리 가져오기 유닛 테스트', () => {
  it('장소 카테고리 가져오기: 음식', () => {
    const test = getPlaceCategory(['restaurant', 'food', 'cafe']);
    expect(test).toBe('음식');
  });

  it('장소 카테고리 가져오기: 교통', () => {
    const test = getPlaceCategory([
      'transportation_service',
      'airposrt',
      'bus_stop',
    ]);
    expect(test).toBe('교통');
  });

  it('장소 카테고리 가져오기: 쇼핑', () => {
    const test = getPlaceCategory(['store']);
    expect(test).toBe('쇼핑');
  });

  it('장소 카테고리 가져오기: 관광', () => {
    const test = getPlaceCategory(['tourist_attraction']);
    expect(test).toBe('관광');
  });
});

describe('숫자에 1,000 단위 콤마를 추가', () => {
  it('숫자에 1,000 단위 콤마를 추가: 99,999,999', () => {
    const test = convertComma(99999999);
    expect(test).toBe('99,999,999');
  });

  it('숫자에 1,000 단위 콤마를 추가: 20,000', () => {
    const test = convertComma(20000);
    expect(test).toBe('20,000');
  });
});

describe('장소/지출 카테고리 한글로 변환', () => {
  it('장소/지출 카테고리 한글로 변환: 교통', () => {
    const test = convertCategory('transport');
    expect(test).toBe('교통');
  });

  it('장소/지출 카테고리 한글로 변환: 쇼핑', () => {
    const test = convertCategory('shopping');
    expect(test).toBe('쇼핑');
  });
});
