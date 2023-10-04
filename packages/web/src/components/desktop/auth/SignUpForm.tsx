'use client';

import AuthServiceTermModal from '@/components/common/auth/AuthServiceTermModal';
import QuestionLink from '@/components/common/auth/QuestionLink';
import WelcomeBox from '@/components/common/auth/WelcomeBox';
import Button from '@/components/common/system/Button';
import LabelInput from '@/components/common/system/LabelInput';
import useToggle from '@/lib/hooks/useToggle';
import { themedPalette } from '@/styles/palette';
import styled from '@emotion/styled';
import {
  fetchCheckDisplayName,
  fetchSendAuthMail,
  fetchVerifyEmail,
  SignUpParams,
} from '@/lib/api/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUpFormErrors } from '@/lib/formErrors';
import Input from '@/components/common/system/Input';
import { useInput } from '@/lib/hooks/useInput';
import { appError } from '@/lib/error';

interface Props {
  onSubmit: (params: SignUpParams) => void;
  serverError?: string;
  setServerError: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  checkDisplayName: CheckDisplayName;
  setCheckDisplayName: React.Dispatch<React.SetStateAction<CheckDisplayName>>;
  verifyMail: VerifyMail;
  setVerifyMail: React.Dispatch<React.SetStateAction<VerifyMail>>;
  isVerified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CheckDisplayName {
  statusCode: number;
  message: string;
}

export interface VerifyMail {
  statusCode: number;
  message: string;
}

function SignUpForm({
  onSubmit,
  isLoading,
  serverError,
  setServerError,
  checkDisplayName,
  setCheckDisplayName,
  verifyMail,
  setVerifyMail,
  isVerified,
  setIsVerified,
}: Props) {
  // modals of agreement
  const [isOpenServiceAgree, onToggleServiceAgree] = useToggle(false);
  const [isOpenPrivacyAgree, onTogglePrivacyAgree] = useToggle(false);
  const [openVerifyMail, setOpenVerifyMail] = useState(false);
  const [verifyTime, setVerifyTime] = useState(180);
  const [sendMailLoading, setSendMailLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [code, onChangeCode] = useInput('');

  let timer: NodeJS.Timeout;

  // react hook form error options
  const {
    displayName: displayNameOption,
    username: usernameOption,
    password: passwordOption,
    email: emailOption,
  } = signUpFormErrors;

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpParams>({
    defaultValues: {
      displayName: '',
      username: '',
      password: '',
      email: '',
    },
  });

  const onCheckDisplayName = async () => {
    if (
      getValues('displayName') === '' ||
      getValues('displayName').length < 2
    ) {
      setCheckDisplayName({
        statusCode: 0,
        message: '',
      });
      return;
    }

    try {
      const response = await fetchCheckDisplayName({
        displayName: getValues('displayName'),
      });
      if (response.statusCode === 200) {
        setCheckDisplayName({
          statusCode: response.statusCode,
          message: '사용 가능한 별명입니다.',
        });
      } else {
        setCheckDisplayName({
          statusCode: response.statusCode,
          message: '이미 사용중인 별명입니다.',
        });
      }
    } catch (e) {}
  };

  const onSendEmail = async () => {
    const email = getValues('email');
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (sendMailLoading || email === '' || !emailRegex.test(email)) {
      return;
    }

    setSendMailLoading(true);
    setServerError('');
    setVerifyMail({
      statusCode: 0,
      message: '',
    });

    try {
      const response = await fetchSendAuthMail(email);
      if (response.statusCode === 200) {
        setOpenVerifyMail(true);

        timer = setInterval(() => {
          setVerifyTime((prev) => prev - 1);
        }, 1000);

        setTimeout(
          () => {
            clearInterval(timer);
            setVerifyTime(180);
            setVerifyMail({
              statusCode: 0,
              message: '제한 시간을 초과하였습니다. 다시 시도해주세요.',
            });
          },
          (verifyTime + 1) * 1000,
        );
      } else {
        setServerError(appError(response.name));
      }
    } catch (e) {
      setVerifyMail({
        statusCode: 500,
        message: '인증 메일 전송에 실패했습니다.',
      });
    } finally {
      setSendMailLoading(false);
    }
  };

  const onVerifyEmail = async () => {
    setVerifyLoading(true);

    if (verifyLoading) {
      return;
    }

    if (code === '') {
      setVerifyMail({
        statusCode: 0,
        message: '인증번호를 입력해주세요.',
      });
      return;
    }

    try {
      const response = await fetchVerifyEmail(getValues('email'), code);
      if (response.statusCode === 200) {
        setVerifyMail({
          statusCode: 0,
          message: '',
        });

        clearInterval(timer);
        setVerifyTime(180);
        setIsVerified(true);
      } else {
        setVerifyMail({
          statusCode: response.statusCode,
          message: appError(response.name),
        });
      }
    } catch (e) {
      setVerifyMail({
        statusCode: 500,
        message: '인증에 실패했습니다.',
      });
    } finally {
      setVerifyLoading(false);
    }
  };

  const verifyTimeToString = () => {
    const minutes = Math.floor(verifyTime / 60);
    const seconds = verifyTime % 60;

    const formmattedMinutes = String(minutes).padStart(2, '0');
    const formmattedSeconds = String(seconds).padStart(2, '0');

    return {
      minutes: formmattedMinutes,
      seconds: formmattedSeconds,
    };
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Block>
      <WelcomeBox type="signUp" />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <LabelInput
            label="별명"
            type="text"
            name="displayName"
            placeholder="다른 분들이 뭐라고 부를까요?"
            description="포인트를 이용해 언제든 변경할 수 있어요!"
            errors={errors.displayName}
            register={register}
            options={displayNameOption}
            innerMessage={checkDisplayName}
            onBlur={onCheckDisplayName}
          />
          <LabelInput
            label="아이디"
            type="text"
            name="username"
            placeholder="4~20자 영문과 숫자로만 가능해요!"
            errors={errors.username}
            register={register}
            options={usernameOption}
          />
          <LabelInput
            label="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호는 최소 8글자 이상이어야 해요!"
            errors={errors.password}
            register={register}
            options={passwordOption}
          />
          <LabelInput
            label="이메일 인증"
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            onClick={onSendEmail}
            buttonText="전송"
            errors={errors.email}
            register={register}
            options={emailOption}
            disabled={openVerifyMail}
            isLoading={sendMailLoading}
          />
          {openVerifyMail && (
            <VerifyEmailBox>
              <LabelBox isVerified={isVerified}>
                <label>인증번호</label>
                <p>
                  {isVerified
                    ? '인증에 성공하셨어요!'
                    : `${verifyTimeToString().minutes}:${
                        verifyTimeToString().seconds
                      }`}
                </p>
              </LabelBox>
              <WithButtonInputBox>
                <Input
                  placeholder="발송된 인증번호를 입력해주세요"
                  value={code}
                  onChange={onChangeCode}
                  disabled={isVerified}
                />
                <Button
                  type="button"
                  onClick={onVerifyEmail}
                  disabled={isVerified}
                >
                  인증
                </Button>
              </WithButtonInputBox>
              <VerifyMessageBox>
                <p>{verifyMail.message}</p>
              </VerifyMessageBox>
            </VerifyEmailBox>
          )}
        </InputGroup>
        {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
        <ActionsBox>
          <AgreementBox>
            <span>
              가입과 동시에 <b>MS인</b> 가입 시 필수 약관인
              <br />
              <button type="button" onClick={onToggleServiceAgree}>
                서비스 이용 약관
              </button>{' '}
              과{' '}
              <button type="button" onClick={onTogglePrivacyAgree}>
                개인정보 보호 정책
              </button>{' '}
              약관에 동의하게 됩니다.
            </span>
          </AgreementBox>
          <Button type="submit" layout="fullWidth" isLoading={isLoading}>
            가입하기
          </Button>
        </ActionsBox>
      </StyledForm>
      <QuestionLink
        className="text-center"
        question="계정이 있으신가요?"
        name="로그인"
        to="/auth/signin"
      />
      {isOpenServiceAgree && (
        <AuthServiceTermModal type="service" onToggle={onToggleServiceAgree} />
      )}
      {isOpenPrivacyAgree && (
        <AuthServiceTermModal type="privacy" onToggle={onTogglePrivacyAgree} />
      )}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin-top: 100px;
  gap: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const VerifyEmailBox = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: ${themedPalette.bg_page3};
  border: 1px solid ${themedPalette.border3};
  border-radius: 4px;
  box-shadow: ${themedPalette.shadow2};

  label {
    font-weight: 600;
    font-size: 14px;
  }

  input {
    background: ${themedPalette.bg_element2};

    &:focus {
      border-color: ${themedPalette.border2};
    }
  }
`;

const LabelBox = styled.div<{ isVerified: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 12px;
    color: ${({ isVerified }) =>
      isVerified ? themedPalette.success_text : themedPalette.danger2};
  }
`;

const WithButtonInputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;
  button {
    white-space: nowrap;
    min-width: 62px;
  }
`;

const VerifyMessageBox = styled.div`
  p {
    font-size: 14px;
    color: ${themedPalette.danger2};
  }
`;

const AgreementBox = styled.div`
  span {
    font-size: 14px;
    color: ${themedPalette.text4};
  }
  button {
    font-size: 14px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    color: ${themedPalette.primary1};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${themedPalette.danger1};
  padding: 8px 0;
`;

const ActionsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default SignUpForm;
