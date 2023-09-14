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
    description: '나만의 프로필을 꾸며보세요!',
  },
  {
    name: '내 등급',
    href: 'me/level',
    description: '나의 등급을 확인해보세요!',
  },
  {
    name: '비밀번호 변경',
    href: 'me/password',
    description: '더욱 안전한 비밀번호로 변경해보세요!',
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
