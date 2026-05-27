/**
 * @file: EmblaCarousel.tsx
 * @author: chad
 * @since: 2026.05.27 ~
 * @description: 이미지 스와이퍼 컴포넌트
 */

'use client';

import { useState, useCallback, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IEmblaCarousel {
  imageUrls: string[];
  className?: string;
}

export default function EmblaCarousel({
  imageUrls,
  className,
}: IEmblaCarousel) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!imageUrls.length) {
    return <div className='text-text-secondary text-center'>등록된 이미지가 없습니다.</div>;
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative h-55 w-full flex-none">
              <Image
                src={url}
                alt={`추억 이미지 ${index + 1}`}
                fill
                sizes="100%"
                className="block object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {imageUrls.length > 1 && (
        <>
          <CaroucelButton
            onClick={() => scrollPrev()}
            position="left"
            arrow={<ChevronLeft className='text-white' />}
          />
          <CaroucelButton
            onClick={() => scrollNext()}
            position="right"
            arrow={<ChevronRight className='text-white' />}
          />
        </>
      )}
    </div>
  );
}

interface ICaroucelButton {
  onClick: () => void;
  arrow: ReactNode | string;
  position: 'left' | 'right';
}

const CaroucelButton = ({ onClick, arrow, position }: ICaroucelButton) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-black/60 absolute top-1/2 z-1 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow transition-colors hover:bg-black/80',
        position === 'left' ? 'left-1' : 'right-1',
      )}
    >
      {arrow}
    </button>
  );
};
