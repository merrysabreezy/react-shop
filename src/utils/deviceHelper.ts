import { useState, useEffect } from 'react';
import { IDevice, IWidthArgs } from '../types/types';

const useWidth = (): IWidthArgs => {
  const initialData = {
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktopXL: false
  };

  const [data, setData] = useState(initialData);
  useEffect(() => {
    resetWidth();
    window.addEventListener('resize', resetWidth);
    return () => {
      window.removeEventListener('resize', resetWidth);
    };
  }, [typeof window !== 'undefined' && window.outerWidth]);

  const resetWidth = (): void => {
    const windowWidth = typeof window !== 'undefined' ? window.outerWidth : 920;
    var mobileOS;
    if (
      typeof window !== 'undefined' &&
      typeof window.navigator !== 'undefined'
    )
      mobileOS =
        /(iPad|iPhone|iPod|webOS|Android|Windows Phone|BlackBerry)/g.test(
          navigator.userAgent
        );

    if (windowWidth <= device.PHONE || mobileOS) {
      setData({ ...initialData, isMobile: true });
    } else if (windowWidth <= device.TABLET)
      setData({ ...initialData, isTablet: true });
    else if (windowWidth <= device.DESKTOP)
      setData({ ...initialData, isLaptop: true });
    else setData({ ...initialData, isDesktopXL: true });
  };
  return data as IWidthArgs;
};

export default useWidth;

const device: IDevice = {
  PHONE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
  DESKTOP_XL: 1920
};
