'use client';

import LogoText from '@/assets/images/vectors/logo-text.svg';
import LogoIconDark from '@/assets/images/vectors/logo-icon-dark.svg';
import { CSSProperties, memo, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

interface Props {
  type?: 'text' | 'icon';
  style?: CSSProperties;
  hasLink?: boolean;
}

function Logo({ style, type = 'text', hasLink = true }: Props) {
  const onReloadWindow = () => {
    window.location.href = '/';
  };

  if (hasLink) {
    return (
      <StyledLink href="/" onClick={onReloadWindow} style={style}>
        {type === 'text' ? <LogoText /> : <LogoIconDark />}
      </StyledLink>
    );
  }

  return (
    <StyledLogo style={style}>
      {type === 'text' ? <LogoText /> : <LogoIconDark />}
    </StyledLogo>
  );
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
`;

export default memo(Logo);
