'use client';

import { ReactNode } from 'react';
import { useGoBack } from '@/lib/hooks/useGoBack';
import styled from '@emotion/styled';
import Logo from '@/components/common/base/Logo';
import Button from '@/components/common/system/Button';

interface Props {
  children: ReactNode;
  title: string;
}

function MapleBoardLayout({ children, title }: Props) {
  const goBack = useGoBack();

  return (
    <Block>
      <EventActionsBox>
        <ViewTitleBox>
          <Logo
            type="icon"
            style={{
              width: '22px',
              height: '22px',
            }}
            hasLink={false}
          />
          <h2>{title}</h2>
        </ViewTitleBox>
        <Button variant="gray" size="small" onClick={goBack}>
          목록으로
        </Button>
      </EventActionsBox>
      {children}
    </Block>
  );
}

const Block = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ViewTitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;

  h2 {
    font-size: 18px;
  }
`;

const EventActionsBox = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default MapleBoardLayout;
