'use client';

import AuthServiceTermModal from '@/components/common/auth/AuthServiceTermModal';
import QuestionLink from '@/components/common/auth/QuestionLink';
import WelcomeBox from '@/components/common/auth/WelcomeBox';
import Button from '@/components/common/system/Button';
import LabelInput from '@/components/common/system/LabelInput';
import Modal from '@/components/common/system/Modal';
import useToggle from '@/lib/hooks/useToggle';
import { themedPalette } from '@/styles/palette';
import styled from '@emotion/styled';

interface Props {}

function SignUpForm({}: Props) {
  const [isOpenServiceAgree, onToggleServiceAgree] = useToggle(false);
  const [isOpenPrivacyAgree, onTogglePrivacyAgree] = useToggle(false);

  return (
    <Block>
      <WelcomeBox type="signUp" />
      <StyledForm>
        <InputGroup>
          <LabelInput
            label="별명"
            type="text"
            placeholder="다른 분들이 뭐라고 부를까요?"
            description="포인트를 이용해 언제든 변경할 수 있어요!"
          />
          <LabelInput
            label="아이디"
            type="text"
            placeholder="아이디를 입력해주세요"
            description="4~20자 영문과 숫자로만 가능해요!"
          />
          <LabelInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            description="비밀번호는 최소 8글자 이상이어야 해요!"
          />
        </InputGroup>
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
          <Button layout="fullWidth">가입하기</Button>
        </ActionsBox>
        <QuestionLink
          className="text-center"
          question="계정이 있으신가요?"
          name="로그인"
          to="/auth/signin"
        />
      </StyledForm>
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
  gap: 32px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
    color: ${themedPalette.primary1};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ActionsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default SignUpForm;
