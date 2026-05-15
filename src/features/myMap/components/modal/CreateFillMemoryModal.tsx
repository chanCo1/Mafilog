/**
 * @file: CreateFillMemoryModal.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: 추억채우기 모달 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { CREATE_MEMORY_STEP_LIST } from '@/features/myMap/constants/myMap.constant';
import FadeInOutStyled from '@/shared/components/FadeInOutStyled';
import { Button } from '@/shared/components/ui/Button';
import { SideModal } from '@/shared/components/ui/SideModal';
import { ChevronLeft } from 'lucide-react';
import Step from '@/shared/components/ui/Step';
import { DateRange } from 'react-day-picker';

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

  const [selectedDate, setSeletedDate] = useState<DateRange | undefined>(
    undefined,
  );

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
      />
      <div className="relative h-[calc(100%-65px)]">
        <FadeInOutStyled isShow={currentStep === 1}>
          <div>asd</div>
          {/* <CreateNewTravelStep1
            travelType={travelType}
            setTravelType={setTravelType}
            selectedCities={selectedCities}
            setSelectedCities={setSelectedCities}
          /> */}
        </FadeInOutStyled>
        <FadeInOutStyled isShow={currentStep === 2}>
          <div>asd</div>
          {/* <CreateNewTravelStep2
            selectedDate={selectedDate}
            setSeletedDate={setSeletedDate}
          /> */}
        </FadeInOutStyled>
        <FadeInOutStyled isShow={currentStep === 3}>
          <div>asd</div>
          {/* <CreateNewTravelStep3
            title={travelTitle}
            setTravelTitle={setTravelTitle}
            travelPartner={travelPartner}
            setTravelPartner={setTravelPartner}
            travelStyle={travelStyle}
            setTravelStyle={setTravelStyle}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            travelMember={travelMember}
            setTravelMember={setTravelMember}
          /> */}
        </FadeInOutStyled>
      </div>
    </SideModal>
  );
}
