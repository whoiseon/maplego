'use client';

import { useEffect } from 'react';

function useBodyScrollLock() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
}

export default useBodyScrollLock;
