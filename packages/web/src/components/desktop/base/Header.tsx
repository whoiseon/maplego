'use client';

import Logo from '@/components/common/base/Logo';
import Button from '@/components/common/system/Button';
import ThemeButton from '@/components/common/system/ThemeButton';
import HeaderNavList from './HeaderNavList';
import { themedPalette } from '@/styles/palette';
import styled from '@emotion/styled';
import { useUser } from '@/states/user';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';

interface Props {
  theme?: string;
}

function Header({ theme }: Props) {
  const { data: meData } = useGetMyAccount();
  const { displayName } = useUser();

  return (
    <StyledHeader>
      <Container>
        <LeftBox>
          <Logo theme={theme} />
          <HeaderNavList />
        </LeftBox>
        <RightBox>
          <ThemeButton />
          <ActionsBox>
            {meData && meData.displayName}
            <Button size="small" variant="text" href="/auth/signin">
              로그인
            </Button>
            <Button size="small" variant="primary" href="/auth/signup">
              가입하기
            </Button>
          </ActionsBox>
        </RightBox>
      </Container>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: ${themedPalette.bg_page2};
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${themedPalette.border4};
  box-shadow: ${themedPalette.shadow1};
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
  gap: 40px;
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

export default Header;
