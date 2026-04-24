/**
 * @file: CreateNewTravelModal.tsx
 * @author: chad
 * @since: 2026.04.24 ~
 * @description: CreateNewTravelModal 컴포넌트, 새 여행 만들기 모달
 */

import { useState } from 'react';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Button } from '@/shared/components/ui/Button';
import Step from '@/shared/components/ui/Step';
import CreateNewTravelStep1 from '@/features/myTravel/components/modal/createNewTravel/CreateNewTravelStep1';
import { ICityList } from '@/features/myTravel/interfaces';

interface ICreateNewTravelModal {
  isOpen: boolean;
  handleClose: () => void;
}

const mock_data = [
  { label: '여행지 선택', isComplete: false },
  { label: '날짜 선택', isComplete: false },
  { label: '여행 정보', isComplete: false },
];

export default function CreateNewTravelModal({
  isOpen,
  handleClose,
}: ICreateNewTravelModal) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCities, setSelectedCities] = useState<ICityList[]>([]);

  return (
    <SideModal
      isOpen={isOpen}
      title="새 여행 만들기"
      handleClose={handleClose}
      footer={
        <>
          {currentStep === 1 && (
            <div className="flex gap-1">
              <Button variant="gray">취소</Button>
              <Button>{selectedCities.length}개 도시/다음</Button>
            </div>
          )}
        </>
      }
    >
      <Step
        stepOptions={mock_data}
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
