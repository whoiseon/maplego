"use client";

import tw, { styled } from "twin.macro";
import WelcomeBox from "@/components/common/auth/WelcomeBox";
import Input from "@/components/common/system/Input";
import Button from "@/components/common/system/Button";
import QuestionLink from "@/components/common/auth/QuestionLink";

interface Props {}

function AuthForm() {
  return (
    <Block>
      <WelcomeBox />
      <StyledForm>
        <InputGroup>
          <InputGroupName>계정 정보</InputGroupName>
          <Input type="text" placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
        </InputGroup>
        <ActionsBox>
          <QuestionLink name="비밀번호를 잊으셨나요?" to="/auth/forgot" />
          <Button layout="full">로그인</Button>
        </ActionsBox>
        <QuestionLink
          className="text-center"
          question="아직 회원이 아니신가요?"
          name="가입하기"
          to="/auth/signup"
        />
      </StyledForm>
    </Block>
  );
}

const Block = styled.div(() => [
  tw`
    flex flex-col w-[380px] mt-24 gap-8
  `,
]);

const StyledForm = styled.form(() => [
  tw`
    flex flex-col gap-4
  `,
]);

const InputGroupName = styled.p(() => [
  tw`
    text-text2
  `,
]);

const InputGroup = styled.div(() => [
  tw`
    flex flex-col gap-2
  `,
]);

const ActionsBox = styled.div(() => [
  tw`
    flex flex-col gap-2
  `,
]);

export default AuthForm;
