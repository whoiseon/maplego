"use client";

import tw, { styled } from "twin.macro";
import Logo from "@/components/common/base/Logo";
import { useMemo } from "react";

interface Props {
  type?: "signIn" | "signUp";
}

function WelcomeBox({ type = "signIn" }: Props) {
  const textMap = useMemo(
    () => ({
      signIn: (
        <StyledText>
          오늘도 <b>MS인</b>에 오신 것을 환영해요!
        </StyledText>
      ),
      signUp: (
        <StyledText>
          "처음 뵐게요! 이곳은 <b>MS인</b> 입니다"
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

const Block = styled.div(() => [
  tw`
    flex flex-col items-center w-full gap-4
  `,
]);

const StyledText = styled.h2(() => [
  tw`
    font-normal
  `,
]);

export default WelcomeBox;
