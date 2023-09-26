'use client';

import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

interface Props {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: Props) {
  return <StyledCard className={className}>{children}</StyledCard>;
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: ${themedPalette.bg_element1};
  box-shadow: ${themedPalette.shadow1};
  border: 1px solid ${themedPalette.border4};
  width: 100%;
`;

export default Card;
