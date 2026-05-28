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
import { useDialogStore } from '@/shared/stores/useDialogStore';
import { ILabelValue } from '@/shared/interfaces';
import { toast } from 'sonner';
import { IMemoryScheduleResponse } from '@/features/myMap/interfaces/memory.interface';
import { useGetTravelSchedules } from '@/features/myTravel/hooks/rquery/schedule/useGetTravelSchedules';
import { useCreateMemory } from '@/features/myMap/hooks/rquery/useCreateMemory';
import { getHexCode } from '@/shared/lib/utils';
import { useGetMemoryDetail } from '@/features/myMap/hooks/rquery/useGetMemoryDetail';

interface ICreateFillMemoryModal {
  isOpen: boolean;
  handleClose: () => void;
  isModify?: boolean;
  selectedMapId: string | undefined;
  selectedMapType: string;
  selectedMemoryId: number;
}

export default function CreateFillMemoryModal({
  isOpen,
  handleClose,
  isModify,
  selectedMapId,
  selectedMapType,
  selectedMemoryId,
}: ICreateFillMemoryModal) {
  const [stepData, setStepData] = useState(CREATE_MEMORY_STEP_LIST);
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedTravel, setSelectedTravel] = useState<ILabelValue>({
    label: '선택 안함',
    value: 0,
  });

  const [selectedDate, setSeletedDate] = useState<DateRange | undefined>(
    undefined,
  );

  const [memoryTitle, setMemoryTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<(File | string)[]>([]);
  const [memoryMemo, setMemoryMemo] = useState('');

  const [loadSchedules, setLoadSchedules] = useState<IMemoryScheduleResponse[]>(
    [],
  );

  const [mapColor, setMapColor] = useState(getHexCode());

  const { openDialog } = useDialogStore();

  const { data: travelSchedule } = useGetTravelSchedules(
    selectedTravel.value ? selectedTravel.value.toString() : '',
  );
  const { mutateAsync: createMemory, isPending: isCreatePending } =
    useCreateMemory(selectedMapType);

  const { data: memoryDetail } = useGetMemoryDetail(selectedMemoryId);

  useEffect(() => {
    if (travelSchedule?.length) {
      const scheduleWithRating: IMemoryScheduleResponse[] = travelSchedule.map(
        (schedule) => ({
          ...schedule,
          scheduleList: schedule.scheduleList.map((list) => ({
            ...list,
            rating: 0,
          })),
        }),
      );

      setLoadSchedules(scheduleWithRating);
    } else {
      setLoadSchedules([]);
    }
  }, [travelSchedule]);

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
    openDialog({
      type: 'confirm',
      message: (
        <div className="flex flex-col gap-1">
          <span>작성중인 내용이 있어요</span>
          <span>작성을 그만할까요?</span>
        </div>
      ),
      okLabel: '나가기',
      onOk: () => {
        handleClose();
        dataReset();
      },
    });
  };

  /** 추억 저장 */
  const handelCreateNewMemory = async () => {
    if (!selectedMapId) {
      toast.error('지도가 선택되지 않았습니다');
      return;
    }

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

    const formData = new FormData();

    formData.append('mapId', selectedMapId);
    formData.append('mapType', selectedMapType);
    formData.append('title', memoryTitle);
    formData.append('from', selectedDate?.from?.toISOString() || '');
    formData.append('to', selectedDate?.to?.toISOString() || '');
    formData.append('memo', memoryMemo);
    formData.append('mapColor', mapColor);

    if (selectedTravel.value !== 0) {
      formData.append('scheduleId', selectedTravel.value.toString());
      formData.append('scheduleTitle', selectedTravel.label);
    }

    formData.append('schedules', JSON.stringify(loadSchedules));

    selectedImage.forEach((file) => {
      formData.append('imageUrl', file);
    });

    if (isModify) {
      console.log('수정');
    } else {
      await createMemory(formData);
    }

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
    setSelectedTravel({ label: '선택 안함', value: 0 });
    setSeletedDate(undefined);
    setMemoryTitle('');
    setSelectedImage([]);
    setMemoryMemo('');
  };

  /** 날짜 선택 완료 후 지웠을 경우 */
  useEffect(() => {
    if (stepData[1].isComplete && !selectedDate) {
      setStepData((prev) =>
        prev.map((step, index) =>
          index === 1 ? { ...step, isComplete: false } : step,
        ),
      );
    }
  }, [selectedDate]);

  /** 여행 불러왔을 경우 스텝2 체크완료 */
  useEffect(() => {
    if (selectedTravel.value && selectedDate) {
      setStepData((prev) =>
        prev.map((step, index) =>
          index === 1 ? { ...step, isComplete: true } : step,
        ),
      );
    }
  }, [selectedTravel.value, selectedDate]);

  /** 수정 시 초기값 대입 */
  useEffect(() => {
    if (isOpen) {
      if (isModify && memoryDetail?.id) {
        setStepData(stepData.map((step) => ({ ...step, isComplete: true })));

        setSelectedTravel({
          label: memoryDetail.scheduleTitle ?? '선택 안함',
          value: memoryDetail.scheduleId as string ?? 0,
        });
        setSeletedDate({
          from: new Date(memoryDetail.from),
          to: new Date(memoryDetail.to),
        });
        setMemoryTitle(memoryDetail.title);
        setSelectedImage(memoryDetail.imageUrl);
        setMemoryMemo(memoryDetail.memo);

        setLoadSchedules(memoryDetail.schedules);
        setMapColor(memoryDetail.hexCode);
      }
    }
  }, [isModify, memoryDetail, isOpen, selectedMemoryId]);

  return (
    <SideModal
      isOpen={isOpen}
      title={isModify ? '추억 수정' : '추억 채우기'}
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
              <Button
                disabled={!selectedDate || !memoryTitle || isCreatePending}
                isLoading={isCreatePending}
                onClick={handelCreateNewMemory}
              >
                추억 만들기
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
      <div className="relative h-[calc(100%-80px)]">
        <FadeInOutStyled
          isShow={currentStep === 1}
          clasName="h-[calc(100%-90px)]"
        >
          <FillMemoryStep1
            selectedTravel={selectedTravel}
            setSelectedTravel={setSelectedTravel}
            setSeletedDate={setSeletedDate}
            loadSchedules={loadSchedules}
            setLoadSchedules={setLoadSchedules}
          />
        </FadeInOutStyled>
        <FadeInOutStyled isShow={currentStep === 2}>
          <FillMemoryStep2
            selectedDate={selectedDate}
            setSeletedDate={setSeletedDate}
            disabled={!!selectedTravel.value}
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
            mapColor={mapColor}
            setMapColor={setMapColor}
          />
        </FadeInOutStyled>
      </div>
    </SideModal>
  );
}
