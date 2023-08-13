"use client";

import WelcomeBox from "@/components/common/auth/WelcomeBox";
import Input from "@/components/common/system/Input";
import Button from "@/components/common/system/Button";
import QuestionLink from "@/components/common/auth/QuestionLink";
import styled from "@emotion/styled";
import { themedPalette } from "@/styles/palette";

interface Props {}

function AuthForm() {
  return (
    <Block>
      <WelcomeBox />
      <StyledForm>
        <InputGroup>
          <InputGroupTitle>계정 정보</InputGroupTitle>
          <Input type="text" placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
        </InputGroup>
        <ActionsBox>
          <QuestionLink name="비밀번호를 잊으셨나요?" to="/auth/forgot" />
          <Button layout="fullWidth">로그인</Button>
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

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin-top: 100px;
  gap: 32px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroupTitle = styled.p`
  color: ${themedPalette.text2};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActionsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default AuthForm;
