/**
 * @file: IntroduceList.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: IntroduceList 컴포넌트, 간략 소개 설명 리스트
 */

import { Check } from 'lucide-react';

interface IIntroduceList {
  list : string;
}

export const IntroduceList = ({ list }: IIntroduceList) => {
  return (
    <div className="flex items-center gap-1">
      <Check className="text-primary h-5 w-5" />
      <span>{list}</span>
    </div>
  );
};
