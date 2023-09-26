'use client';

import { ReactNode } from 'react';
import styled from '@emotion/styled';

function EventViewLayout({ children }: { children: ReactNode }) {
  return <Block>{children}</Block>;
}

const Block = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EventActionsBox = styled.div``;

export default EventViewLayout;
