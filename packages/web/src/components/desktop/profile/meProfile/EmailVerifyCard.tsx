import MeCard from '@/components/desktop/profile/MeCard';
import styled from '@emotion/styled';
import MyEmailIcon from '@/assets/images/vectors/my-email-icon.svg';
import Input from '@/components/common/system/Input';
import { themedPalette } from '@/styles/palette';
import { useGetMyAccount } from '@/lib/hooks/queries/useGetMyAccount';
import { useInput } from '@/lib/hooks/useInput';
import WarningIcon from '@/assets/images/vectors/warning-icon.svg';
import SuccessIcon from '@/assets/images/vectors/success-icon.svg';

function EmailVerifyCard() {
  const { data: meData } = useGetMyAccount();
  const isVerified = !!meData?.email || false;

  const [email, onChangeEmail] = useInput(meData?.email || '');

  const onVerifyEmail = () => {
    console.log(email);
  };

  return (
    <MeCard
      title="이메일 인증"
      icon={<MyEmailIcon />}
      description="원활한 활동을 위해서는 이메일 주소를 인증해야합니다."
      onEdit={onVerifyEmail}
      buttonText="인증"
    >
      <EmailVerifyBox>
        <InputGroup>
          <Input
            placeholder="이메일 주소를 입력해주세요."
            value={email}
            onChange={onChangeEmail}
          />
        </InputGroup>
        <VerifyBox isVerified={isVerified}>
          {isVerified ? <SuccessIcon /> : <WarningIcon />}
          <span>
            {isVerified
              ? '이메일 주소를 인증하셨어요!'
              : '아직 이메일 주소를 인증하지 않으셨어요!'}
          </span>
        </VerifyBox>
      </EmailVerifyBox>
    </MeCard>
  );
}

const EmailVerifyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  padding: 0 1.5rem 1.5rem;
`;

const InputGroup = styled.div`
  input {
    font-size: 14px;

    &:focus {
      border: 1px solid ${themedPalette.border2};
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;

const VerifyBox = styled.div<{ isVerified: boolean }>`
  display: inline-flex;
  align-items: center;
  border-radius: 40px;
  gap: 0 0.5rem;
  color: ${({ isVerified }) =>
    isVerified ? themedPalette.success_text : themedPalette.warning_text};

  svg {
    width: 16px;
    height: 16px;
    color: inherit;
  }
`;

export default EmailVerifyCard;
