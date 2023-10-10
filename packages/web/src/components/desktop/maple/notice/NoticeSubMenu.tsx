'use client';

import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import Button from '@/components/common/system/Button';
import { usePathname, useSearchParams } from 'next/navigation';

const dummySubLinks = [
  { name: '전체', query: 'all' },
  { name: '공지', query: 'notice' },
  { name: '점검', query: 'inspection' },
  { name: 'GM소식', query: 'gmDiary' },
];

function NoticeSubMenu() {
  const pathname = usePathname();
  const queryString = useSearchParams().get('target');
  const isIndex = pathname === '/talk';

  const renderSubLinks = useMemo(
    () =>
      dummySubLinks.map((link) => {
        const isActive =
          queryString === link.query || (!queryString && link.query === '0');

        const href =
          link.query !== '0' ? `${pathname}?target=${link.query}` : pathname;

        return (
          <li key={link.name}>
            <Button
              className={isActive ? 'active' : ''}
              href={href}
              variant="text"
              size="small"
            >
              {link.name}
            </Button>
          </li>
        );
      }),
    [pathname, queryString],
  );

  if (isIndex) {
    return null;
  }

  return (
    <BoardToolBox>
      <SubLinksBox>{renderSubLinks}</SubLinksBox>
    </BoardToolBox>
  );
}

const BoardToolBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid ${themedPalette.border4};
`;

const SubLinksBox = styled.ul`
  display: flex;
  align-items: center;
  gap: 0 2px;

  a {
    display: flex;
    align-items: center;
    gap: 0 4px;
    color: ${themedPalette.text3};

    svg {
      margin: 0;
    }

    &:hover {
      color: ${themedPalette.primary1};
    }

    &.active {
      color: ${themedPalette.primary2};
      font-weight: 600;
    }
  }
`;

export default NoticeSubMenu;
