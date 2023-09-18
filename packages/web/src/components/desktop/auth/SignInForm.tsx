'use client';

import WelcomeBox from '@/components/common/auth/WelcomeBox';
import Input from '@/components/common/system/Input';
import Button from '@/components/common/system/Button';
import QuestionLink from '@/components/common/auth/QuestionLink';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { SignInParams } from '@/lib/api/auth';
import { signInFormErrors } from '@/lib/formErrors';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
  onSubmit: (params: SignInParams) => void;
  serverError: string;
  setServerError: Dispatch<SetStateAction<string>>;
  isLoading?: boolean;
}

function SignInForm({
  onSubmit,
  serverError,
  setServerError,
  isLoading,
}: Props) {
  // react hook form error options
  const { username: usernameOption, password: passwordOption } =
    signInFormErrors;

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParams>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <Block>
      <WelcomeBox />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputGroupTitle>계정 정보</InputGroupTitle>
          <Input
            type="text"
            placeholder="아이디"
            name="username"
            register={register}
            errors={errors}
            options={usernameOption}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            name="password"
            register={register}
            errors={errors}
            options={passwordOption}
          />
        </InputGroup>
        {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
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
  font-size: 14px;
  color: ${themedPalette.text2};
  font-weight: 700;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: ${themedPalette.danger1};
`;

const ActionsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default SignInForm;
