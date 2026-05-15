/**
 * @file: CreateFillMemoryModal.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: 추억채우기 모달 컴포넌트
 */

import { useState, useEffect } from 'react';
import { CREATE_MEMORY_STEP_LIST } from '@/features/myMap/constants/myMap.constant';
import FadeInOutStyled from '@/shared/components/FadeInOutStyled';
import { Button } from '@/shared/components/ui/Button';
import { SideModal } from '@/shared/components/ui/SideModal';
import { ChevronLeft } from 'lucide-react';
import Step from '@/shared/components/ui/Step';
import { DateRange } from 'react-day-picker';
import FillMemoryStep1 from '@/features/myMap/components/modal/fillMemory/FillMemoryStep1';
import FillMemoryStep2 from '@/features/myMap/components/modal/fillMemory/FillmemoryStep2';
import FillMemoryStep3 from '@/features/myMap/components/modal/fillMemory/FillMemoryStep3';

interface ICreateFillMemoryModal {
  isOpen: boolean;
  handleClose: () => void;
  isModify?: boolean;
}

export default function CreateFillMemoryModal({
  isOpen,
  handleClose,
  isModify = false,
}: ICreateFillMemoryModal) {
  const [stepData, setStepData] = useState(CREATE_MEMORY_STEP_LIST);
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedTravel, setSelectedTravel] = useState(true);

  const [selectedDate, setSeletedDate] = useState<DateRange | undefined>(
    undefined,
  );

  const [memoryTitle, setMemoryTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [memoryMemo, setMemoryMemo] = useState('');

  /** 다음 핸들링 */
  const handelNextStep = () => {
    setStepData((prev) =>
      prev.map((step, index) =>
        index === currentStep - 1 ? { ...step, isComplete: true } : step,
      ),
    );

    if (currentStep !== stepData.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  /** 이전 핸들링 */
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  /** 닫기 버튼 클릭 */
  const onClickCloseBtn = () => {
    handleClose();
    // dataReset();
  };

  const handelCreateNewMemory = () => {};

  useEffect(() => {
    /** 날짜 선택 완료 후 지웠을 경우 */
    if (stepData[1].isComplete && !selectedDate) {
      setStepData((prev) =>
        prev.map((step, index) =>
          index === 1 ? { ...step, isComplete: false } : step,
        ),
      );
    }
  }, [selectedDate]);

  return (
    <SideModal
      isOpen={isOpen}
      title="추억 채우기"
      handleClose={onClickCloseBtn}
      footer={
        <div className="flex gap-1">
          {currentStep === 1 && (
            <>
              <Button variant="gray" onClick={onClickCloseBtn}>
                취소
              </Button>
              <Button
                // disabled={!selectedCities.length}
                onClick={handelNextStep}
              >
                다음
              </Button>
            </>
          )}
          {currentStep === 2 && (
            <>
              <Button
                variant="gray"
                onClick={handlePrevStep}
                prefix={<ChevronLeft className="h-4 w-4" />}
              >
                이전
              </Button>
              <Button disabled={!selectedDate} onClick={handelNextStep}>
                다음
              </Button>
            </>
          )}
          {currentStep === 3 && (
            <>
              <Button
                variant="gray"
                onClick={handlePrevStep}
                prefix={<ChevronLeft className="h-4 w-4" />}
              >
                이전
              </Button>
              <Button onClick={handelCreateNewMemory}>여행 만들기</Button>
            </>
          )}
        </div>
      }
    >
      <Step
        stepOptions={stepData}
        currentStep={currentStep}
        onClickStep={setCurrentStep}
        className="pb-4"
      />
      <div className="relative h-[calc(100%-170px)]">
        <FadeInOutStyled isShow={currentStep === 1}>
          <FillMemoryStep1
            selectedTravel={selectedTravel}
            setSelectedTravel={setSelectedTravel}
          />
        </FadeInOutStyled>
        <FadeInOutStyled isShow={currentStep === 2}>
          <FillMemoryStep2
            selectedDate={selectedDate}
            setSeletedDate={setSeletedDate}
          />
        </FadeInOutStyled>
        <FadeInOutStyled isShow={currentStep === 3}>
          <FillMemoryStep3
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            memoryTitle={memoryTitle}
            setMemoryTitle={setMemoryTitle}
            memoryMemo={memoryMemo}
            setMemoryMemo={setMemoryMemo}
          />
        </FadeInOutStyled>
      </div>
    </SideModal>
  );
}
