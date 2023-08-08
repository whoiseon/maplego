'use client';

import MsInLogo from '@/assets/images/vectors/msin-logo.svg';
import MsInLogoDark from '@/assets/images/vectors/msin-logo-dark.svg';
import { useTheme } from 'next-themes';
import { memo, useEffect, useState } from 'react';
import Link from 'next/link';

interface Props {
  theme?: string;
}

function Logo({ theme }: Props) {
  const [firstMounted, setFirstMounted] = useState(true);
  const loadedTheme = theme || 'light';
  const { theme: currentTheme } = useTheme();

  const onReloadWindow = () => {
    window.location.reload();
  };

  useEffect(() => {
    setFirstMounted(false);
  }, []);

  if (firstMounted) {
    return loadedTheme === 'dark' ? <MsInLogoDark /> : <MsInLogo />;
  }

  return (
    <Link href="/" onClick={onReloadWindow}>
      {currentTheme === 'dark' ? <MsInLogoDark /> : <MsInLogo />}
    </Link>
  );
}

export default memo(Logo);
