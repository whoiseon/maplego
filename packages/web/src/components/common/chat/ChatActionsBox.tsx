'use client';

import styled from '@emotion/styled';
import Input from '@/components/common/system/Input';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';

function ChatActionsBox() {
  const { data: meData } = useGetMyAccount();
  return (
    <Block>
      <Input placeholder="로그인 후 참여할 수 있어요!" disabled={!meData} />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  padding: 1.25rem 1.25rem 1.5rem;

  input {
    font-size: 14px;
  }
`;

export default ChatActionsBox;
