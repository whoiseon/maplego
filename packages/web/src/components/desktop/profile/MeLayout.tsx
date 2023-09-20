'use client';

import LinksHeader from '@/components/desktop/system/LinksHeader';
import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
}

const dummyProfilePageMap: {
  name: string;
  href: string;
  description?: string;
}[] = [
  {
    name: '내 프로필',
    href: 'me/profile',
    description: '나만의 개성있는 프로필을 만들어보세요',
  },
  {
    name: '내 등급',
    href: 'me/level',
    description:
      '등급을 확인하고, MP를 모아서 더 높은 등급으로 진급 할 수 있어요!',
  },
  {
    name: '내 포인트',
    href: 'me/mp',
    description: '포인트를 모아서 다양한 혜택을 받아보세요!',
  },
  {
    name: '비밀번호 변경',
    href: 'me/password',
    description: '90일마다 비밀번호를 변경하시는 것을 권장드려요!',
  },
];

function MeLayout({ children }: Props) {
  return (
    <Block>
      <LinksHeader
        title="프로필"
        description="다양한 정보와 유용한 팁을 공유하고, 함께 도움을 주고 받아보세요!"
        links={dummyProfilePageMap}
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

export default MeLayout;
