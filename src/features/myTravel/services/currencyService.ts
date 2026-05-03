import { EXCHANGE_RATE_API_URL } from "@/shared/constants/apiUrls";

export const fetchExchangeRate = async (base: string = 'KRW') => {
  const response = await fetch(EXCHANGE_RATE_API_URL);
  if (!response.ok) throw new Error('환율 정보를 가져오지 못했습니다.');
  return response.json();
};