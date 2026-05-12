'use client';

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
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { CREATE_TRAVEL_STEP_LIST } from '@/features/myTravel/constants';
import CreateNewTravelStep2 from '@/features/myTravel/components/modal/createNewTravel/CreateNewTravelStep2';
import CreateNewTravelStep3 from '@/features/myTravel/components/modal/createNewTravel/CreateNewTravelStep3';
import { ChevronLeft } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';
import { useMyTravelListStore } from '@/shared/stores/useMyTravelListStrore';
import FadeInOutStyled from '@/shared/components/FadeInOutStyled';
import { IMemberList } from '@/shared/interfaces';
import { TRAVEL_PARTNER, TRAVEL_STYLE } from '@/shared/types/Enum';

interface ICreateNewTravelModal {
  isOpen: boolean;
  handleClose: () => void;
  isModify?: boolean;
}

export default function CreateNewTravelModal({
  isOpen,
  handleClose,
  isModify = false,
}: ICreateNewTravelModal) {
  const { setUpcomingTravel } = useMyTravelListStore();

  const [stepData, setStepData] = useState(CREATE_TRAVEL_STEP_LIST);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCities, setSelectedCities] = useState<IPlaceList[]>([]);
  const [selectedDate, setSeletedDate] = useState<DateRange | undefined>(
    undefined,
  );
  const [travelTitle, setTravelTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [travelPartner, setTravelPartner] = useState<TRAVEL_PARTNER>(
    TRAVEL_PARTNER.ALONE,
  );
  const [travelStyle, setTravelStyle] = useState<TRAVEL_STYLE[]>([]);
  const [travelMember, setTravelMember] = useState<IMemberList[]>([
    { id: '1', name: '나' },
  ]);

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
    dataReset();
  };

  /** 새 여행 만들기 */
  const createNewTravel = () => {
    const falseComplete = stepData.filter((step, index) => {
      // 완료되지 않은 스텝이 있을 경우
      if (stepData.length - 1 > index + 1) {
        return !step.isComplete;
      }
    });

    if (falseComplete.length) {
      toast.error('입력되지 않은 항목이 있습니다');
      return;
    }

    // 여행 이름 구하기
    const getTravelName = () => {
      if (travelTitle) return travelTitle;

      // TODO: const로도 값이 변경되는지 확인
      let cityName: string[] = [];
      selectedCities.forEach((city) => {
        cityName.push(city.name);
      });

      return `${cityName.join(', ')} 여행`;
    };

    const params = {
      cities: selectedCities,
      from: selectedDate?.from,
      to: selectedDate?.to,
      title: getTravelName(),
      companion: travelPartner,
      travelStyle: travelStyle,
      image: selectedImage,
      member: travelMember,
    };

    // TODO: 임시
    setUpcomingTravel(params);

    onClickCloseBtn();
    toast.success('새 여행을 만들었어요');
  };

  /** 데이터 초기화 */
  const dataReset = () => {
    if (isModify) return;

    stepData.forEach((data) => {
      data.isComplete = false;
    });
    setCurrentStep(1);
    setSelectedCities([]);
    setSeletedDate(undefined);
    setTravelTitle('');
    setSelectedImage([]);
    setTravelPartner('alone');
    setTravelStyle([]);
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
              <Button onClick={createNewTravel}>여행 만들기</Button>
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
          <CreateNewTravelStep1
            selectedCities={selectedCities}
            setSelectedCities={setSelectedCities}
          />
        </FadeInOutStyled>
        <FadeInOutStyled isShow={currentStep === 2}>
          <CreateNewTravelStep2
            selectedDate={selectedDate}
            setSeletedDate={setSeletedDate}
          />
        </FadeInOutStyled>
        <FadeInOutStyled isShow={currentStep === 3}>
          <CreateNewTravelStep3
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
          />
        </FadeInOutStyled>
      </div>
    </SideModal>
  );
}
