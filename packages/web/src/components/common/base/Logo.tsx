'use client';

import MsInLogo from '@/assets/images/vectors/msin-logo.svg';
import MsInLogoDark from '@/assets/images/vectors/msin-logo-dark.svg';
import { useTheme } from 'next-themes';
import { memo, useEffect, useState } from 'react';
import storage from '@/lib/storage';

interface Props {
  theme?: string;
}

function Logo({ theme }: Props) {
  const [firstMounted, setFirstMounted] = useState(true);
  const loadedTheme = theme || 'light';
  const { theme: currentTheme } = useTheme();

  useEffect(() => {
    setFirstMounted(false);
  }, []);

  if (firstMounted) {
    return loadedTheme === 'dark' ? <MsInLogoDark /> : <MsInLogo />;
  }

  return currentTheme === 'dark' ? <MsInLogoDark /> : <MsInLogo />;
}

export default memo(Logo);
