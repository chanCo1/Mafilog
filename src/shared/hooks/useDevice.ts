/**
 * @file: useDevice.ts
 * @author: chad
 * @since: 2026.05.29 ~
 * @description: 접속환경 (모바일, 테블릿, 데스크탑) 구분 훅
 */

import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'unknown';

interface IDeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
  windowWidth: number;
}

const BREAKPOINTS = {
  MOBILE_MAX: 767,
  TABLET_MAX: 1023,
};

export const useDevice = (): IDeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<IDeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    deviceType: 'unknown',
    windowWidth: 0,
  });

  useEffect(() => {
    // 화면 크기를 계산하는 함수
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < BREAKPOINTS.MOBILE_MAX) {
        setDeviceInfo({
          isMobile: true,
          isTablet: false,
          isDesktop: false,
          deviceType: 'mobile',
          windowWidth: width,
        });
      } else if (width < BREAKPOINTS.TABLET_MAX) {
        setDeviceInfo({
          isMobile: false,
          isTablet: true,
          isDesktop: false,
          deviceType: 'tablet',
          windowWidth: width,
        });
      } else {
        setDeviceInfo({
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          deviceType: 'desktop',
          windowWidth: width,
        });
      }
    };

    handleResize();

    // 창 크기가 바뀔 때마다 실행되도록 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 언마운트시 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceInfo;
};