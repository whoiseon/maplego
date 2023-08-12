"use client";

import Logo from "@/components/common/base/Logo";
import Button from "@/components/common/system/Button";
import ThemeButton from "@/components/common/system/ThemeButton";
import HeaderNavList from "./HeaderNavList";
import tw, { styled } from "twin.macro";
import { css } from "@emotion/react";

interface Props {
  theme?: string;
}

function Header({ theme }: Props) {
  return (
    <StyledHeader>
      <div className="flex items-center justify-between h-full w-[1280px] min-w-[1280px] mx-auto my-0">
        <div className="left-box flex items-center gap-10">
          <Logo theme={theme} />
          <HeaderNavList />
        </div>
        <div className="right-box flex items-center gap-1">
          <ThemeButton />
          <div className="flex items-center gap-2">
            <Button variant="text" href="/auth/signin">
              로그인
            </Button>
            <Button href="/auth/signup">가입하기</Button>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.header(() => [
  tw`
    bg-bg_page2 sticky top-0 flex justify-between min-w-[1280px] h-[72px] border-b-border4 border-b-[1px] shadow-shadow1
  `,
  css``,
]);

export default Header;
