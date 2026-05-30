/**
 * @file: Step.tsx
 * @author: chad
 * @since: 2026.04.24 ~
 * @description: Step 컴포넌트
 */

import { cn } from '@/shared/lib/utils';
import { CircledNumber } from '@/shared/components/ui/CircledNumber';
import { ChevronRight } from 'lucide-react';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { Button } from '@/shared/components/ui/Button';

interface IStep {
  className?: string;
  currentStep: number;
  stepOptions: {
    label: string;
    isComplete: boolean;
  }[];
  onClickStep: (step: number) => void;
}

export default function Step({
  className,
  stepOptions,
  currentStep,
  onClickStep,
}: IStep) {
  const completeSteps = stepOptions.filter((options) => options.isComplete);

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {stepOptions.map((option, index) => {
        const currentIndexStep = index + 1;

        // 완료된 항목 보다 다음다음 스텝일 경우 비활성화
        const isDisabled = completeSteps.length < index;

        return (
          <div key={index} className="flex items-center">
            <Button
              variant="ghost"
              disabled={isDisabled}
              onClick={() => onClickStep(currentIndexStep)}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                {option.isComplete ? (
                  <CategoryIcon
                    variant="check"
                    size="sm"
                    className="bg-primary text-white"
                  />
                ) : (
                  <CircledNumber
                    number={currentIndexStep}
                    variant="primaryOutline"
                    size="sm"
                  />
                )}
                <span
                  className={cn(
                    'text-sm',
                    currentStep === currentIndexStep && 'underline',
                  )}
                >
                  {option.label}
                </span>
              </div>
            </Button>
            {index + 1 < stepOptions.length && (
              <ChevronRight className="text-text-secondary h-4 w-4" />
            )}
          </div>
        );
      })}
    </div>
  );
}
