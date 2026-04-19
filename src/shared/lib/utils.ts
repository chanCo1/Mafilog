import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

/**
 * 조건부로 클래스 사용(clsx) + props로 받은 스타일이 기본 스타일을 덮어쓰기(twMerge)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
