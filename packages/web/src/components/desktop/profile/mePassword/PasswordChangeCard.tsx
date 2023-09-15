import MeCard from '@/components/desktop/profile/MeCard';
import styled from '@emotion/styled';
import MyPasswordIcon from '@/assets/images/vectors/my-password-icon.svg';
import { themedPalette } from '@/styles/palette';
import LabelInput from '@/components/common/system/LabelInput';
import { useInput } from '@/lib/hooks/useInput';

function PasswordChangeCard() {
  const [password, onChangePassword] = useInput('');
  const [newPassword, onChangeNewPassword] = useInput('');
  const [newPasswordConfirm, onChangeNewPasswordConfirm] = useInput('');

  const onPasswordChange = () => {
    console.log({
      password,
      newPassword,
      newPasswordConfirm,
    });
  };

  return (
    <MeCard
      title="비밀번호 변경"
      icon={<MyPasswordIcon />}
      buttonText="변경"
      onEdit={onPasswordChange}
    >
      <PasswordChangeBox>
        <InputGroup>
          <LabelInput
            type="password"
            boxClassName="input-item"
            label="현재 비밀번호"
            value={password}
            onChange={onChangePassword}
          />
          <LabelInput
            type="password"
            boxClassName="input-item"
            label="새로운 비밀번호"
            value={newPassword}
            onChange={onChangeNewPassword}
          />
          <LabelInput
            type="password"
            boxClassName="input-item"
            label="새로운 비밀번호 확인"
            value={newPasswordConfirm}
            onChange={onChangeNewPasswordConfirm}
          />
        </InputGroup>
      </PasswordChangeBox>
    </MeCard>
  );
}

const PasswordChangeBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  padding: 0 1.5rem 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;

  .input-item {
    gap: 6px 0;
  }

  input {
    height: 52px;

    &:focus {
      border: 1px solid ${themedPalette.border2};
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;

export default PasswordChangeCard;
