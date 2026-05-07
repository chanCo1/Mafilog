/**
 * @file: Calculator.tsx
 * @author: chad
 * @since: 2026.05.06 ~
 * @description: 계산기 컴포넌트
 */

import { ReactNode, useState, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import Selectbox from '@/shared/components/ui/Selectbox';
import { convertComma } from '@/shared/lib/utils';
import { Divide, Plus, Minus, X, Delete } from 'lucide-react';
import { evaluate } from 'mathjs';
import { Button } from '@/shared/components/ui/Button';
import { ILabelValue } from '@/shared/interfaces';
import { useCountriesDataStore } from '@/shared/stores/useCountriesDataStore';
import { useGetCurrencyByCountry } from '@/shared/hooks/useGetCurrencyByCountry';
import { CURRENCY_STANDARD_AMOUNT } from '@/features/myTravel/constants';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';

interface ICalculator {}

export default function Calculator() {
  const travelInfo = useTravelInfoStore((state) => state.travelInfo);

  const [currencyList, setCurrencyList] = useState<ILabelValue[]>();
  const [selectedCurrency, setSelectedCurrency] = useState<ILabelValue>();

  const [inpuNumber, setInputNumber] = useState('');
  const [result, setResult] = useState(0);
  const [calcResultCurrency, setCalcResultCurrency] = useState(0);
  

  const { countryData } = useCountriesDataStore();

  const getCurrency = useGetCurrencyByCountry(
    selectedCurrency?.value as string,
    CURRENCY_STANDARD_AMOUNT,
  );

  useEffect(() => {
    if (countryData) {
      /** 여행중인 나라의 코드만 추출 */
      const getCountryCode = travelInfo.cities.map((city) => city.country.code);

      /** 미국 정보 가져오기 */
      const getUSAdata = countryData['US'];

      const filteredList = Object.values(countryData).filter((value) =>
        getCountryCode.includes(value.code),
      );

      /** 미국 데이터와 합치기 */
      const mergeFilteredListWithUsa = [...filteredList, getUSAdata];

      const countryMap = mergeFilteredListWithUsa.map((list) => ({
        label: Object.keys(list.currency)[0],
        value: list.code,
      }));

      setCurrencyList(countryMap);
      setSelectedCurrency(countryMap[0]);
    }
  }, [travelInfo.cities]);

  /** 숫자 클릭 */
  const handleClickNumber = (num: string) => {
    setInputNumber((prev) => prev + num);
  };

  /** 연산자 클릭 */
  const handleOperator = (op: string) => {
    if (!inpuNumber) return;

    // 마지막 글자가 이미 연산자인지 확인 (중복 방지)
    const lastChar = inpuNumber.trim().slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) return;

    setInputNumber((prev) => `${prev} ${op} `);
  };

  /** 하나씩 지우기 (Delete) */
  const handleDelete = () => {
    setInputNumber((prev) => prev.trimEnd().slice(0, -1));
  };

  /** 초기화 */
  const handleClear = () => {
    setInputNumber('');
    setResult(0);
    setCalcResultCurrency(0)
  };

  useEffect(() => {
    if (!inpuNumber) {
      handleClear();
    };

    try {
      // 수식의 끝이 연산자로 끝나지 않을 때만 계산
      const lastChar = inpuNumber.trim().slice(-1);
      if (inpuNumber && !['+', '-', '*', '/'].includes(lastChar)) {
        const calculated = evaluate(inpuNumber);
        setResult(calculated);
      }
    } catch (error) {
      console.log('Calculation Error');
    }
  }, [inpuNumber]);

  useEffect(() => {
    setCalcResultCurrency(result * Number(getCurrency?.convertedWon))
  }, [result, getCurrency]);

  return (
    <div className="flex flex-col">
      <Card>
        <div className="text-text-secondary flex items-center justify-between text-sm font-bold">
          <span className="">계산식</span>
          <span className="">{inpuNumber || '-'}</span>
        </div>
        <div className="flex items-center justify-between">
          {currencyList && (
            <div className="max-w-20">
              <Selectbox
                variant="none"
                options={currencyList}
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e)}
              />
            </div>
          )}
          <span className="text-state-success text-xxl font-bold">
            {convertComma(result)}
          </span>
        </div>
        <div className="text-text-secondary flex items-center justify-between text-sm font-bold">
          <span>{`환율 (${getCurrency?.currencyCode} 1 = KRW ${getCurrency?.convertedWon})`}</span>
          <span>{convertComma(calcResultCurrency)}</span>
        </div>
      </Card>

      <div className="grid grid-cols-5 gap-1 px-2 py-1">
        <CalcNumberArea number="1" onClick={() => handleClickNumber('1')} />
        <CalcNumberArea number="2" onClick={() => handleClickNumber('2')} />
        <CalcNumberArea number="3" onClick={() => handleClickNumber('3')} />
        <CalcNumberArea
          number={<X className="text-primary" />}
          onClick={() => handleOperator('*')}
        />
        <CalcNumberArea
          number={<Delete className="text-primary" />}
          onClick={handleDelete}
        />
        <CalcNumberArea number="4" onClick={() => handleClickNumber('4')} />
        <CalcNumberArea number="5" onClick={() => handleClickNumber('5')} />
        <CalcNumberArea number="6" onClick={() => handleClickNumber('6')} />
        <CalcNumberArea
          number={<Divide className="text-primary" />}
          onClick={() => handleOperator('/')}
        />
        <CalcNumberArea
          number="AC"
          className="text-primary"
          onClick={handleClear}
        />
        <CalcNumberArea number="7" onClick={() => handleClickNumber('7')} />
        <CalcNumberArea number="8" onClick={() => handleClickNumber('8')} />
        <CalcNumberArea number="9" onClick={() => handleClickNumber('9')} />
        <CalcNumberArea
          number={<Plus className="text-primary" />}
          onClick={() => handleOperator('+')}
        />
        <div />
        <CalcNumberArea number="0" onClick={() => handleClickNumber('0')} />
        <CalcNumberArea number="00" onClick={() => handleClickNumber('00')} />
        <CalcNumberArea number="." onClick={() => handleClickNumber('.')} />
        <CalcNumberArea
          number={<Minus className="text-primary" />}
          onClick={() => handleOperator('-')}
        />
        <div />
      </div>
    </div>
  );
}

const CalcNumberArea = ({
  number,
  className,
  onClick,
}: {
  number: ReactNode | string;
  className?: string;
  onClick?: () => void;
}) => (
  <Button className={cn('w-full', className)} variant="ghost" onClick={onClick}>
    {number}
  </Button>
);
