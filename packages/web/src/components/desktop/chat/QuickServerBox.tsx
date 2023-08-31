'use client';

import styled from '@emotion/styled';
import ServerIcon from '@/components/common/maple/ServerIcon';
import { themedPalette } from '@/styles/palette';
import { media } from '@/lib/media';
import { useMemo, useState } from 'react';
import QuickServerButton from '@/components/desktop/chat/QuickServerButton';

const dummyServerMarkedServer = [
  { code: 4, name: '오로라' },
  { code: 6, name: '이노시스' },
  { code: 10, name: '제니스' },
  { code: 11, name: '크로아' },
  { code: 15, name: '노바' },
];

function QuickServerBox() {
  const renderMarkedServer = useMemo(
    () =>
      dummyServerMarkedServer.map((server) => (
        <QuickServerButton
          key={server.code}
          code={server.code}
          name={server.name}
        />
      )),
    [],
  );

  return <Block>{renderMarkedServer}</Block>;
}

const Block = styled.div`
  display: none;

  ${media.xwide} {
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    position: absolute;
    top: 0;
    left: -50px;
    z-index: 99;
    width: 40px;
    max-width: 40px;
  }
`;

export default QuickServerBox;
