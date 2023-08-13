"use client";

import Logo from "@/components/common/base/Logo";
import Button from "@/components/common/system/Button";
import ThemeButton from "@/components/common/system/ThemeButton";
import HeaderNavList from "./HeaderNavList";
import { themedPalette } from "@/styles/palette";
import styled from "@emotion/styled";

interface Props {
  theme?: string;
}

function Header({ theme }: Props) {
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
            <Button size="small" variant="text" href="/auth/signin">
              로그인
            </Button>
            <Button size="small" href="/auth/signup">
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
  box-shadow: 0 4px 16px 0 ${themedPalette.shadow1};
  z-index: 99;
  height: 72px;
`;

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  min-width: 1280px;
  height: 100%;
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
