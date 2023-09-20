import MeCard from '@/components/desktop/profile/MeCard';
import styled from '@emotion/styled';
import MyPasswordIcon from '@/assets/images/vectors/my-password-icon.svg';
import { themedPalette } from '@/styles/palette';
import LabelInput from '@/components/common/system/LabelInput';
import { useInput } from '@/lib/hooks/useInput';
import { useEffect, useState } from 'react';
import { useChangePassword } from '@/lib/hooks/queries/useChangePassword';

export interface ServerMessage {
  type: 'success' | 'error';
  message: string;
}

function PasswordChangeCard() {
  const [password, onChangePassword] = useInput('');
  const [newPassword, onChangeNewPassword] = useInput('');
  const [newPasswordConfirm, onChangeNewPasswordConfirm] = useInput('');
  const [serverMessage, setServerMessage] = useState<ServerMessage>({
    type: 'success',
    message: '',
  });

  const [mutate, isLoading] = useChangePassword(setServerMessage);

  const validatePasswordInput = (): boolean => {
    if (!password) {
      setServerMessage({
        type: 'error',
        message: '현재 비밀번호를 입력해주세요.',
      });
      return false;
    }

    if (!newPassword) {
      setServerMessage({
        type: 'error',
        message: '새로운 비밀번호를 입력해주세요.',
      });
      return false;
    }

    if (!newPasswordConfirm) {
      setServerMessage({
        type: 'error',
        message: '새로운 비밀번호 확인을 입력해주세요.',
      });
      return false;
    }

    if (newPassword !== newPasswordConfirm) {
      setServerMessage({
        type: 'error',
        message: '새로운 비밀번호가 일치하지 않습니다.',
      });
      return false;
    }

    return true;
  };

  const onPasswordChange = () => {
    if (!validatePasswordInput()) return;

    mutate({
      currentPassword: password,
      newPassword,
    });
  };

  return (
    <MeCard
      title="비밀번호 변경"
      icon={<MyPasswordIcon />}
      buttonText="변경"
      onEdit={onPasswordChange}
      message={serverMessage}
    >
      <PasswordChangeForm onSubmit={onPasswordChange}>
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
      </PasswordChangeForm>
    </MeCard>
  );
}

const PasswordChangeForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  padding: 0 1.5rem 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;

  input {
    font-size: 14px;

    &:focus {
      border: 1px solid ${themedPalette.border2};
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;

export default PasswordChangeCard;
