'use client';

import Logo from '@/components/common/base/Logo';
import { useMemo } from 'react';
import { themedPalette } from '@/styles/palette';
import styled from '@emotion/styled';

interface Props {
  type?: 'signIn' | 'signUp';
}

function WelcomeBox({ type = 'signIn' }: Props) {
  const textMap = useMemo(
    () => ({
      signIn: (
        <StyledText>
          오늘도 <b>MS인</b>에 오신 것을 환영해요!
        </StyledText>
      ),
      signUp: (
        <StyledText>
          처음 뵐게요! 이곳은 <b>MS인</b> 입니다
        </StyledText>
      ),
    }),
    []
  );

  return (
    <Block>
      <Logo type="icon" />
      {textMap[type]}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

const StyledText = styled.h2`
  font-weight: 500;
  font-size: 16px;
  color: ${themedPalette.text1};
`;

export default WelcomeBox;
