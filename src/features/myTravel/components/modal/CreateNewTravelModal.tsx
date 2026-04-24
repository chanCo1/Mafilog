/**
 * @file: CreateNewTravelModal.tsx
 * @author: chad
 * @since: 2026.04.24 ~
 * @description: CreateNewTravelModal 컴포넌트, 새 여행 만들기 모달
 */

import { useEffect, useState } from 'react';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Button } from '@/shared/components/ui/Button';
import Step from '@/shared/components/ui/Step';
import CreateNewTravelStep1 from '@/features/myTravel/components/modal/createNewTravel/CreateNewTravelStep1';
import { ICityList } from '@/features/myTravel/interfaces';

interface ICreateNewTravelModal {
  isOpen: boolean;
  handleClose: () => void;
  isModify?: false;
}

const STEP_DATA = [
  { id: 1, label: '여행지 선택', isComplete: false },
  { id: 2, label: '날짜 선택', isComplete: false },
  { id: 3, label: '여행 정보', isComplete: false },
];

export default function CreateNewTravelModal({
  isOpen,
  handleClose,
  isModify = false,
}: ICreateNewTravelModal) {
  const [stepData, setStepData] = useState(STEP_DATA);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCities, setSelectedCities] = useState<ICityList[]>([]);

  /** 다음 핸들링 */
  const handelNextStep = () => {
    setStepData((prev) =>
      prev.map((step, index) =>
        index === currentStep - 1 ? { ...step, isComplete: true } : step,
      ),
    );

    setCurrentStep(currentStep + 1);
  };

  /** 이전 핸들링 */
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  /** 닫기 버튼 클릭 */
  const onClickCloseBtn = () => {
    handleClose();
    dataReset();
  };

  /** 데이터 초기화 */
  const dataReset = () => {
    if (isModify) return;

    stepData.forEach((data) => {
      data.isComplete = false;
    });
    setCurrentStep(1);
    setSelectedCities([]);
  };

  useEffect(() => {
    /** 여행지 선택 완료 후 다 지웠을 경우 */
    if (stepData[0].isComplete && !selectedCities.length) {
      setStepData((prev) =>
      prev.map((step, index) =>
        index === 0 ? { ...step, isComplete: false } : step,
      ),
    );
    }
  }, [selectedCities]);

  return (
    <SideModal
      isOpen={isOpen}
      title="새 여행 만들기"
      handleClose={onClickCloseBtn}
      footer={
        <div className="flex gap-1">
          {currentStep === 1 && (
            <>
              <Button variant="gray" onClick={onClickCloseBtn}>
                취소
              </Button>
              <Button
                disabled={!selectedCities.length}
                onClick={handelNextStep}
              >
                {selectedCities.length}개 도시/다음
              </Button>
            </>
          )}
          {currentStep === 2 && (
            <>
              <Button variant="gray" onClick={handlePrevStep}>
                이전
              </Button>
              <Button
                disabled={!selectedCities.length}
                onClick={handelNextStep}
              >
                다음
              </Button>
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
      {currentStep === 1 && (
        <CreateNewTravelStep1
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
        />
      )}
    </SideModal>
  );
}
