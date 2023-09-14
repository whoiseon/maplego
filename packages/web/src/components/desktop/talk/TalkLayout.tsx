'use client';

import { ReactNode } from 'react';
import styled from '@emotion/styled';
import LinksHeader from '@/components/desktop/system/LinksHeader';

interface Props {
  children: ReactNode;
}

const dummyTalkBoardList: {
  name: string;
  href: string;
  description?: string;
}[] = [
  {
    name: '공지사항',
    href: 'talk/notice',
    description: '메이플고 공지사항을 확인하세요!',
  },
  {
    name: '자유',
    href: 'talk/free',
    description: '자유롭고 다양한 주제로 대화를 나누어 보세요!',
  },
  {
    name: '유머',
    href: 'talk/humor',
    description: '재미있는 것들은 함께 봐요!',
  },
  {
    name: '코디',
    href: 'talk/coordi',
    description: '나만의 메이플 코디를 공유해보세요!',
  },
  {
    name: '팁과 노하우',
    href: 'talk/tips',
    description: '메이플스토리의 다양한 팁과 노하우를 공유해보세요!',
  },
  {
    name: '사건 사고',
    href: 'talk/issues',
    description: '오늘은 어떤 사건이 있었나요?',
  },
  {
    name: '서버',
    href: 'talk/server/all',
    description: '각 서버에서는 무슨 일이 일어날까요!?',
  },
  {
    name: '직업',
    href: 'talk/job/all',
    description: '직업별로 어떤 이야기가 있는지 확인해보세요!',
  },
  {
    name: '질문',
    href: 'talk/question',
    description: '궁금한 모든 것을 물어보세요!',
  },
  {
    name: '신고',
    href: 'talk/report',
    description: '신고할 내용을 자세히 알려주세요!',
  },
];

function TalkLayout({ children }: Props) {
  return (
    <Block>
      <LinksHeader
        title="커뮤니티 홈"
        description="다양한 정보와 유용한 팁을 공유하고, 함께 도움을 주고 받아보세요!"
        links={dummyTalkBoardList}
      />
      {children}
    </Block>
  );
}

const Block = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  gap: 20px 0;
`;

export default TalkLayout;
