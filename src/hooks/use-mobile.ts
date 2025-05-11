import { useEffect, useState } from 'react';

import { screens } from '@/styles/screens';

const MOBILE_BREAKPOINT = screens.md;

export const useIsMobile = (breakPoint = MOBILE_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakPoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakPoint);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < breakPoint);
    return () => mql.removeEventListener('change', onChange);
  }, [breakPoint]);

  return !!isMobile;
};
