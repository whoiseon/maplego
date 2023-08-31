import Link from 'next/link';
import { useMemo } from 'react';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import Button from '@/components/common/system/Button';

interface Props {}

const menuMaps = [
  { title: '메이플', href: '/maple' },
  { title: '정보', href: '/info' },
  { title: '커뮤니티', href: '/talk' },
  { title: '마켓', href: '/market' },
  { title: '경매장', href: '/auction', notReady: true },
];

function HeaderNavList({}: Props) {
  const renderMenuItem = useMemo(
    () =>
      menuMaps.map((menu) => (
        <Button
          key={menu.title}
          size="small"
          variant="text"
          href={menu.href}
          style={{ fontSize: '16px' }}
        >
          {menu.title}
        </Button>
      )),
    [menuMaps],
  );

  return (
    <nav>
      <StyledNavList>{renderMenuItem}</StyledNavList>
    </nav>
  );
}

const StyledNavList = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export default HeaderNavList;
