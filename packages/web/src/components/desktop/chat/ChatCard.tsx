'use client';

import Card from '@/components/common/system/Card';
import styled from '@emotion/styled';
import ServerSelectBox from '@/components/common/chat/ServerSelectBox';
import { themedPalette } from '@/styles/palette';
import Input from '@/components/common/system/Input';
import ChatActionsBox from '@/components/common/chat/ChatActionsBox';
import ChatListBox from '@/components/common/chat/ChatListBox';
import QuickServerBox from '@/components/desktop/chat/QuickServerBox';

function ChatCard() {
  return (
    <Block>
      <Card>
        <ChatHeader>
          <ServerSelectBox />
          <OnlineCount>
            <span className="count-value">12,421</span>
            <span className="count-after-text">명이 참여중!</span>
          </OnlineCount>
        </ChatHeader>
        <ChatListBox />
        <ChatActionsBox />
      </Card>
      <QuickServerBox />
    </Block>
  );
}

const Block = styled.section`
  position: relative;
`;

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

export default ChatCard;
