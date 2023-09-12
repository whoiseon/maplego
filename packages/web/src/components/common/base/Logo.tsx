'use client';

import LogoText from '@/assets/images/vectors/logo-text.svg';
import LogoTextDark from '@/assets/images/vectors/logo-text-dark.svg';
import LogoIconDark from '@/assets/images/vectors/logo-icon-dark.svg';
import { useTheme } from 'next-themes';
import { CSSProperties, memo, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import { useIsMediaDark } from '@/lib/hooks/useIsMediaDark';

interface Props {
  type?: 'text' | 'icon';
  style?: CSSProperties;
}

function Logo({ style, type = 'text' }: Props) {
  const onReloadWindow = () => {
    window.location.href = '/';
  };

  return (
    <StyledLink href="/" onClick={onReloadWindow} style={style}>
      {type === 'text' ? <LogoText /> : <LogoIconDark />}
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export default memo(Logo);
