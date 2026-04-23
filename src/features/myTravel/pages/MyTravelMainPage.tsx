/**
 * @file: MainPage.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: MainPage 컴포넌트
 */

import { useState } from 'react';
import PageHeader from '@/shared/components/ui/PageHeader';
import { Button } from '@/shared/components/ui/Button';

interface IMyTravelMainPage {}

export default function MyTravelMainPage() {
  return (
    <div className='flex flex-col gap-7'>
      <PageHeader title='내 여행' description='내 모든 여행을 한 곳에서 확인해보세요' />
      <div className='flex flex-col gap-1 items-center pt-20'>
        <p className='text-lg text-text-secondary'>아직 다녀온 여행이 없어요. 첫 번째 여행지는 어디인가요?</p>
        <Button variant='secondary' size='lg'>새 여행 만들기</Button>
      </div>
    </div>
  );
}
