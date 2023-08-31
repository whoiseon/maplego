'use client';

import styled from '@emotion/styled';
import Card from '@/components/common/system/Card';
import { useCallback, useMemo, useState } from 'react';
import transitions from '@/lib/transitions';
import { themedPalette } from '@/styles/palette';

interface Props {
  onToggle: () => void;
  modalClosing: boolean;
}

const dummyServerList = [
  { id: 1, name: '전체월드' },
  { id: 2, name: '리부트' },
  { id: 3, name: '오로라' },
  { id: 4, name: '레드' },
  { id: 5, name: '이노시스' },
  { id: 6, name: '유니온' },
  { id: 7, name: '스카니아' },
  { id: 8, name: '루나' },
];

function ServerListBox({ onToggle, modalClosing }: Props) {
  const renderServerList = useMemo(
    () =>
      dummyServerList.map((server) => (
        <ServerBox key={server.id}>{server.name}</ServerBox>
      )),
    [],
  );

  return (
    <StyledListBox className={modalClosing ? 'close' : 'open'}>
      <Card>{renderServerList}</Card>
    </StyledListBox>
  );
}

const StyledListBox = styled.ul`
  position: absolute;
  top: 46px;
  left: 0;
  width: 340px;
  border: 1px solid ${themedPalette.border4};
  border-radius: 4px;
  box-shadow: ${themedPalette.shadow1};
  z-index: 999;

  & > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1.25rem;
    gap: 0.5rem;
  }

  &.close {
    animation: ${transitions.modalCloseToTop} 0.3s ease-in-out forwards;
  }

  &.open {
    animation: ${transitions.modalOpenFromTop} 0.3s ease-in-out;
  }
`;

const ServerBox = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${themedPalette.border3};
  background: ${themedPalette.bg_page1};
  font-size: 12px;
  font-weight: 600;
  box-shadow: ${themedPalette.shadow2};
`;

export default ServerListBox;
