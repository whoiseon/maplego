'use client';

import styled from '@emotion/styled';
import Input from '@/components/common/system/Input';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import { themedPalette } from '@/styles/palette';

function ChatActionsBox() {
  const { data: meData } = useGetMyAccount();

  return (
    <Block>
      <Input
        placeholder={
          meData
            ? '오늘은 어떤 일들이 있었나요?'
            : '로그인 후 참여할 수 있어요!'
        }
        disabled={!meData}
      />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  padding: 1.25rem 1.25rem 1.5rem;

  input {
    font-size: 14px;
    background: ${themedPalette.bg_page2};

    &:focus {
      border: 1px solid ${themedPalette.border2};
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;

export default ChatActionsBox;
