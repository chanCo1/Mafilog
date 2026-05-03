/**
 * @file: IntroduceList.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: IntroduceList 컴포넌트, 간략 소개 설명 리스트
 */

import { Dot } from 'lucide-react';

interface IIntroduceList {
  list : string;
}

export const IntroduceList = ({ list }: IIntroduceList) => {
  return (
    <div className="flex items-center gap-1 break-keep">
      <Dot className="text-primary h-5 w-5 shrink-0" strokeWidth={4} />
      <span>{list}</span>
    </div>
  );
};
