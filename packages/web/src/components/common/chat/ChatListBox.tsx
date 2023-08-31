import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { useMemo } from 'react';
import ChatItem from '@/components/common/chat/ChatItem';

const chatDummyData = [
  { displayName: '강동원', level: 1, body: '안녕하세요 여러분' },
  { displayName: '송혜교', level: 1, body: '반갑습니다~' },
  { displayName: '현빈', level: 1, body: '여러분들 안녕하세요!' },
  { displayName: '박보검', level: 1, body: '좋은 하루 되세요!' },
  { displayName: '김태희', level: 1, body: '만나서 반가워요' },
  { displayName: '공유', level: 1, body: '안녕하세요 여러분!' },
  { displayName: '한지민', level: 1, body: '오늘 기분이 좋아요' },
  { displayName: '이종석', level: 1, body: '무엇을 이야기할까요?' },
  { displayName: '김고은', level: 1, body: '즐거운 하루 보내세요!' },
  { displayName: '지창욱', level: 1, body: '여러분 안녕하세요!' },
  { displayName: '신민아', level: 1, body: '반가워요~' },
  { displayName: '박서준', level: 1, body: '행복한 하루 되세요!' },
  { displayName: '김소현', level: 1, body: '안녕~ 반가워!' },
  { displayName: '윤시윤', level: 1, body: '오늘 날씨가 좋네요' },
  { displayName: '이성경', level: 1, body: '즐거운 하루 되세요' },
  { displayName: '손예진', level: 1, body: '모두 행복하세요!' },
  { displayName: '박해일', level: 1, body: '잘 지내시죠?' },
  { displayName: '김유정', level: 1, body: '안녕하세요~' },
  { displayName: '조정석', level: 1, body: '좋은 하루 보내세요' },
  { displayName: '남주혁', level: 1, body: '행복한 하루 되세요!' },
];

function ChatListBox() {
  const renderedChatMessages = useMemo(
    () =>
      chatDummyData.map((chat, index) => (
        <ChatItem key={chat.displayName} data={chat} />
      )),
    [],
  );

  return (
    <Block>
      <ul>{renderedChatMessages}</ul>
    </Block>
  );
}

const Block = styled.div`
  padding: 0 1.25rem;
  width: calc(100% - 8px);
  height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: ${themedPalette.bg_element4};
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${themedPalette.bg_element1};
    border-radius: 50px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 6px 0;
  }
`;

export default ChatListBox;
