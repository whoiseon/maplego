'use client';

import LogoText from '@/assets/images/vectors/logo-text.svg';
import LogoTextDark from '@/assets/images/vectors/logo-text-dark.svg';
import LogoIconDark from '@/assets/images/vectors/logo-icon-dark.svg';
import { useTheme } from 'next-themes';
import { CSSProperties, memo, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

interface Props {
  theme?: string;
  type?: 'text' | 'icon';
  style?: CSSProperties;
}

function Logo({ theme, style, type = 'text' }: Props) {
  const [firstMounted, setFirstMounted] = useState(true);
  const loadedTheme = theme || 'light';
  const { theme: currentTheme } = useTheme();

  const onReloadWindow = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    setFirstMounted(false);
  }, []);

  if (firstMounted) {
    return type === 'text' ? (
      loadedTheme === 'dark' ? (
        <LogoTextDark />
      ) : (
        <LogoText />
      )
    ) : (
      <LogoIconDark />
    );
  }

  return (
    <StyledLink href="/" onClick={onReloadWindow} style={style}>
      {type === 'text' ? (
        currentTheme === 'dark' ? (
          <LogoTextDark />
        ) : (
          <LogoText />
        )
      ) : (
        <LogoIconDark />
      )}
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export default memo(Logo);
