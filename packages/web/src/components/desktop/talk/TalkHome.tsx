'use client';

import styled from '@emotion/styled';
import LinksHeader from '@/components/desktop/system/LinksHeader';

export const dummyTalkBoardList: { name: string; href: string }[] = [
  { name: '공지사항', href: 'notice' },
  { name: '자유', href: 'free' },
  { name: '유머', href: 'humor' },
  { name: '코디', href: 'coordi' },
  { name: '팁과 노하우', href: 'tips' },
  { name: '사건 사고', href: 'issues' },
  { name: '서버', href: 'server/all' },
  { name: '직업', href: 'job/all' },
  { name: '질문', href: 'question' },
  { name: '신고', href: 'report' },
];

function TalkHome() {
  return (
    <Block>
      <LinksHeader
        title="커뮤니티 홈"
        description="다양한 정보와 유용한 팁을 공유하고, 함께 도움을 주고 받아보세요!"
        links={dummyTalkBoardList}
      />
    </Block>
  );
}

const Block = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  gap: 20px 0;
`;

export default TalkHome;
