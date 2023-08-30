'use client';

import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

interface Props {
  children: ReactNode;
}

function Card({ children }: Props) {
  return <StyledCard>{children}</StyledCard>;
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: ${themedPalette.bg_element1};
  box-shadow: ${themedPalette.shadow1};
`;

export default Card;
