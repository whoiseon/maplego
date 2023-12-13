import { usePathname, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import Button from '@/components/common/system/Button';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

const subLink = [
  { name: '종합 랭킹', query: 'all' },
  { name: '인기도 랭킹', query: 'pop' },
  { name: '유니온 랭킹', query: 'union' },
  { name: '무릉 랭킹', query: 'dojang' },
  { name: '더시드 랭킹', query: 'seed' },
];

function MapleRankSubMenu() {
  const pathname = usePathname();
  const queryString = useSearchParams().get('target');
  const isIndex = pathname === '/talk';

  const renderSubLinks = useMemo(
    () =>
      subLink.map((link) => {
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

export default MapleRankSubMenu;
