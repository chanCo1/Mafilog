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
import FadeInOutStyled from '@/shared/components/FadeInOutStyled';
import { IMemberList } from '@/shared/interfaces';
import { TRAVEL_PARTNER, TRAVEL_STYLE, TRAVEL_TYPE } from '@/shared/types/Enum';
import { useSession } from 'next-auth/react';
import { getTravelDay } from '@/shared/lib/utils';
import { useCreateMyTravelList } from '@/features/myTravel/hooks/rquery/myTravel/useCreateMyTravelList';
import { useRouter } from 'next/navigation';
import { useGetMyTravelDetail } from '@/features/myTravel/hooks/rquery/myTravel/useGetMyTravelDetail';
import { useGetTravelId } from '@/features/myTravel/hooks/useGetTravelId';
import { truncateText } from '@/shared/lib/utils';
import { useUpdateMyTravel } from '@/features/myTravel/hooks/rquery/myTravel/useUpdateMyTravel';
import { useDialogStore } from '@/shared/stores/useDialogStore';

interface ICreateNewTravelModal {
  isOpen: boolean;
  handleClose: () => void;
  isModify?: boolean;
  isNotTravelPage?: boolean;
}

export default function CreateNewTravelModal({
  isOpen,
  handleClose,
  isModify,
  isNotTravelPage,
}: ICreateNewTravelModal) {
  const { data: userInfo } = useSession();
  const { openDialog } = useDialogStore();

  const [stepData, setStepData] = useState(CREATE_TRAVEL_STEP_LIST);
  const [currentStep, setCurrentStep] = useState(1);

  const [travelType, setTravelType] = useState<TRAVEL_TYPE | ''>('');
  const [selectedCities, setSelectedCities] = useState<IPlaceList[]>([]);
  const [selectedDate, setSeletedDate] = useState<DateRange | undefined>(
    undefined,
  );
  const [travelTitle, setTravelTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<(File | string)[]>([]);
  const [travelPartner, setTravelPartner] = useState<TRAVEL_PARTNER>(
    TRAVEL_PARTNER.ALONE,
  );
  const [travelStyles, setTravelStyles] = useState<TRAVEL_STYLE[]>([]);
  const [travelMember, setTravelMember] = useState<IMemberList[]>([]);

  const { mutateAsync: createTravelMutate, isPending } =
    useCreateMyTravelList();
  const travelId = useGetTravelId();
  const { data: travelDetail } = useGetMyTravelDetail(travelId);
  const { mutateAsync: updateTravelDetail, isPending: isUpdatePending } =
    useUpdateMyTravel(travelId);

  const router = useRouter();

  useEffect(() => {
    if (userInfo?.user?.id && userInfo?.user?.name) {
      setTravelMember([{ id: userInfo.user.id, name: userInfo.user.name }]);
    }
  }, [userInfo]);

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
  const createNewTravel = async () => {
    const notCompletedStep = stepData.filter((step, index) => {
      // 완료되지 않은 스텝이 있을 경우
      if (stepData.length - 1 > index + 1) {
        return !step.isComplete;
      }
    });

    if (notCompletedStep.length) {
      toast.error('입력되지 않은 항목이 있습니다');
      return;
    }

    // 여행 이름 구하기
    const getTravelName = () => {
      if (travelTitle) return travelTitle;

      const cityName: string[] = [];
      selectedCities.forEach((city) => {
        cityName.push(city.name);
      });

      return `${cityName.join(', ')} 여행`;
    };

    const formData = new FormData();

    formData.append('title', getTravelName());
    formData.append('from', selectedDate?.from?.toISOString() || '');
    formData.append('to', selectedDate?.to?.toISOString() || '');
    formData.append('travelPartner', travelPartner);
    formData.append('travelType', travelType);
    formData.append(
      'travelPeriod',
      getTravelDay(selectedDate?.from, selectedDate?.to).toString(),
    );

    formData.append('cities', JSON.stringify(selectedCities));
    formData.append('travelStyles', JSON.stringify(travelStyles));
    formData.append('member', JSON.stringify(travelMember));

    selectedImage.forEach((file) => {
      formData.append('imageUrl', file);
    });

    if (isModify) {
      if (
        travelDetail?.from !== selectedDate?.from ||
        travelDetail?.to !== selectedDate?.to
      ) {
        openDialog({
          type: 'confirm',
          message:
            '날짜 변경시 해당 날짜에 포함되지 않은 기존 일정과 지출은 삭제돼요. 수정할까요?',
          okLabel: '수정',
          onOk: async () => {
            await updateTravelDetail(formData);
            onClickCloseBtn();
          },
        });

        return;
      }
      await updateTravelDetail(formData);
    } else {
      await createTravelMutate(formData);

      if (isNotTravelPage) {
        router.push('/my-travel');
      }
    }

    onClickCloseBtn();
  };

  /** 데이터 초기화 */
  const dataReset = () => {
    if (isModify) return;

    stepData.forEach((data) => {
      data.isComplete = false;
    });
    setCurrentStep(1);
    setTravelType('');
    setSelectedCities([]);
    setSeletedDate(undefined);
    setTravelTitle('');
    setSelectedImage([]);
    setTravelPartner('alone');
    setTravelStyles([]);
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
  }, [selectedCities, stepData]);

  useEffect(() => {
    /** 날짜 선택 완료 후 지웠을 경우 */
    if (stepData[1].isComplete && !selectedDate) {
      setStepData((prev) =>
        prev.map((step, index) =>
          index === 1 ? { ...step, isComplete: false } : step,
        ),
      );
    }
  }, [selectedDate, stepData]);

  /** 수정 시 상세 값 바인딩 */
  useEffect(() => {
    if (isOpen && isModify && travelDetail) {
      setStepData(stepData.map((step) => ({ ...step, isComplete: true })));

      setTravelType(travelDetail.travelType);
      setSelectedCities(travelDetail.cities);
      setSeletedDate({
        from: new Date(travelDetail.from),
        to: new Date(travelDetail.to),
      });
      setTravelTitle(travelDetail.title);

      setTravelPartner(travelDetail.travelPartner);
      setTravelStyles(travelDetail.travelStyles);
      setTravelMember(travelDetail.member);

      if (travelDetail.imageUrl) {
        setSelectedImage([travelDetail.imageUrl]);
      }
    }
  }, [travelId, isModify, isOpen, stepData, travelDetail]);

  const isDisabled = !travelType || !selectedCities || !selectedDate;

  return (
    <SideModal
      isOpen={isOpen}
      title={
        isModify && travelDetail
          ? `${truncateText(travelDetail.title, 20)}`
          : '새 여행 만들기'
      }
      handleClose={onClickCloseBtn}
      footer={
        <div className="flex gap-1">
          {currentStep === 1 && (
            <>
              <Button variant="gray" onClick={onClickCloseBtn}>
                취소
              </Button>
              <Button
                disabled={!selectedCities.length || !travelType}
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
              <Button
                onClick={createNewTravel}
                disabled={isDisabled || isPending || isUpdatePending}
                isLoading={isPending || isUpdatePending}
              >
                {isModify ? '여행 수정' : '여행 만들기'}
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
        className="pb-4"
      />
      <div className="relative h-[calc(100%-81px)]">
        <FadeInOutStyled isShow={currentStep === 1}>
          <CreateNewTravelStep1
            key={isOpen ? 'open' : 'closed'}
            travelType={travelType}
            setTravelType={setTravelType}
            selectedCities={selectedCities}
            setSelectedCities={setSelectedCities}
          />
        </FadeInOutStyled>
        <FadeInOutStyled isShow={currentStep === 2}>
          <CreateNewTravelStep2
            key={isOpen ? 'open' : 'closed'}
            selectedDate={selectedDate}
            setSeletedDate={setSeletedDate}
          />
        </FadeInOutStyled>
        <FadeInOutStyled isShow={currentStep === 3}>
          <CreateNewTravelStep3
            key={isOpen ? 'open' : 'closed'}
            title={travelTitle}
            setTravelTitle={setTravelTitle}
            travelPartner={travelPartner}
            setTravelPartner={setTravelPartner}
            travelStyles={travelStyles}
            setTravelStyles={setTravelStyles}
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
