'use client';

import Logo from '@/components/common/base/Logo';
import Button from '@/components/common/system/Button';
import ThemeButton from '@/components/common/system/ThemeButton';
import HeaderNavList from './HeaderNavList';
import { themedPalette } from '@/styles/palette';
import styled from '@emotion/styled';
import { useGetMyAccount } from '@/lib/hooks/queries/me/useGetMyAccount';
import { memo, useEffect } from 'react';
import HeaderAuthBox from '@/components/desktop/base/HeaderAuthBox';
import HeaderUserBox from '@/components/desktop/base/HeaderUserBox';

interface Props {}

function Header() {
  const { data: meData } = useGetMyAccount();

  useEffect(() => {
    if (!meData) return;
  }, [meData]);

  return (
    <StyledHeader>
      <Container>
        <LeftBox>
          <Logo />
          <HeaderNavList />
        </LeftBox>
        <RightBox>
          {meData ? <HeaderUserBox mp={meData?.mp} /> : <HeaderAuthBox />}
        </RightBox>
      </Container>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: ${themedPalette.bg_page2};
  border-bottom: 1px solid ${themedPalette.border4};
  box-shadow: ${themedPalette.shadow3};
  z-index: 99;
  min-width: 1320px;
  height: 72px;
`;

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  min-width: 1320px;
  width: 1320px;
  height: 100%;
  padding: 0 1.25rem;
  margin: 0 auto;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ActionsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default memo(Header);
