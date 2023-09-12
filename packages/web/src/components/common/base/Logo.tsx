'use client';

import LogoText from '@/assets/images/vectors/logo-text.svg';
import LogoIconDark from '@/assets/images/vectors/logo-icon-dark.svg';
import { CSSProperties, memo, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

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
