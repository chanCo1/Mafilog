
import { useState, useEffect } from 'react';

/** 마운트 되었는지 확인하는 hook */
export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  return isMounted;
};
