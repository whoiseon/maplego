'use client';

import Card from '@/components/common/system/Card';
import styled from '@emotion/styled';
import { useState } from 'react';
import ServerSelectBox from '@/components/common/chat/ServerSelectBox';
import { themedPalette } from '@/styles/palette';
import Input from '@/components/common/system/Input';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';

function ChatCard() {
  const { data: meData } = useGetMyAccount();

  return (
    <Card>
      <ChatHeader>
        <ServerSelectBox />
        <OnlineCount>
          <span className="count-value">12,421</span>
          <span className="count-after-text">명이 참여중!</span>
        </OnlineCount>
      </ChatHeader>
      <ChatList>
        <ul>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
        </ul>
      </ChatList>
      <ChatActionsBox>
        <Input placeholder="로그인 후 참여할 수 있어요!" disabled={!!meData} />
      </ChatActionsBox>
    </Card>
  );
}

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 1px solid ${themedPalette.border4};
`;

const OnlineCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0 2px;
  font-size: 14px;

  .count-value {
    color: ${themedPalette.primary1};
    font-weight: bold;
  }

  .count-after-text {
    color: ${themedPalette.text2};
  }
`;

const ChatList = styled.div`
  padding: 0 20px;
  width: calc(100% - 8px);
  height: 400px;
  margin-bottom: 1.25rem;
  overflow-y: auto;

  ul {
    display: flex;
    flex-direction: column;
    gap: 4px 0;
  }
`;

const ChatActionsBox = styled.div`
  padding: 0 1.25rem 1.5rem;

  input {
    font-size: 14px;

    &:disabled {
      background: ${themedPalette.bg_page1};
    }
  }
`;

export default ChatCard;
