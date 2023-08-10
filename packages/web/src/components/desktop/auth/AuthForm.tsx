"use client";

import tw, { styled } from "twin.macro";
import WelcomeBox from "@/components/common/auth/WelcomeBox";

interface Props {}

function AuthForm() {
  return (
    <Block>
      <WelcomeBox />
      <StyledForm></StyledForm>
    </Block>
  );
}

const Block = styled.div(() => [
  tw`
    flex flex-col w-[320px] mt-24 gap-8
  `,
]);

const StyledForm = styled.form(() => [
  tw`
 
  `,
]);

export default AuthForm;
