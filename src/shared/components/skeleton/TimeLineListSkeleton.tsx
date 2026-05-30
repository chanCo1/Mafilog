/**
 * @file: TimeLineListSkeleton.tsx
 * @author: chad
 * @since: 2026.05.30 ~
 * @description: TimeLineListSkeleton 컴포넌트
 */

import TimeLineSkeleton from "@/shared/components/skeleton/TimeLineSkeleton";

export default function TimeLineListSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({length: 8}).map((_, index) => (
        <TimeLineSkeleton key={index} />
      ))}
    </div>
  );
}
