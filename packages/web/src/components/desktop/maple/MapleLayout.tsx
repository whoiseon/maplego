'use client';

import LinksHeader from '@/components/desktop/system/LinksHeader';
import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Logo from '@/components/common/base/Logo';

interface Props {
  children: ReactNode;
  subMenu?: ReactNode;
}

const dummyProfilePageMap: {
  name: string;
  href: string;
  description?: string;
}[] = [
  {
    name: '공지사항',
    href: 'maple/notice',
    description: '메이플스토리의 공시사항을 확인해보세요!',
  },
  {
    name: '업데이트',
    href: 'maple/update',
    description: '메이플스토리의 업데이트 소식을 확인해보세요!',
  },
  {
    name: '이벤트',
    href: 'maple/event',
    description:
      '메이플스토리의 다양하고 풍부한 이벤트들을 확인하고, 참여해보세요!',
  },
  // {
  //   name: '캐릭터 검색',
  //   href: 'maple/user',
  //   description: '메이플스토리 유저들을 검색해보세요!',
  // },
  {
    name: '랭킹',
    href: 'maple/rank',
    description: '메이플스토리 유저분들의 랭킹을 확인해보세요!',
  },
  {
    name: '정보',
    href: 'maple/info',
    description: '메이플스토리의 유용한 정보들을 확인해보세요!',
  },
  {
    name: '통계',
    href: 'maple/stats',
    description: '메이플스토리의 다양한 통계를 확인해보세요!',
  },
];

function MapleLayout({ children, subMenu }: Props) {
  return (
    <Block>
      <LinksHeader
        title="메이플"
        titleIcon={
          <Logo
            type="icon"
            style={{ width: '22px', height: '22px' }}
            hasLink={false}
          />
        }
        description="메이플스토리의 다양한 정보를 확인해보세요!"
        links={dummyProfilePageMap}
        subMenu={subMenu ? subMenu : null}
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

export default MapleLayout;
