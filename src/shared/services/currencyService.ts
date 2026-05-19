/**
 * @file: getExchangeRate.ts
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: 환율 정보 api
 */

import axios from 'axios';
interface IGetExchangeRate {
  baseCurrency?: string;
}

const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

export const getExchangeRate = async ({
  baseCurrency = 'KRW',
}: IGetExchangeRate) => {
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;

  const response = await axios.get(url);

  return response.data;
};
