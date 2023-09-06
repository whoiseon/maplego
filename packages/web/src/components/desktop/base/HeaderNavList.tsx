import { useMemo } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/common/system/Button';
import { usePathname } from 'next/navigation';

interface Props {}

const menuMaps = [
  { title: '메이플', href: '/maple' },
  { title: '정보', href: '/info' },
  { title: '커뮤니티', href: '/talk' },
  { title: '마켓', href: '/market' },
  { title: '경매장', href: '/auction', notReady: true },
];

function HeaderNavList({}: Props) {
  const pathname = usePathname();
  const renderMenuItem = useMemo(
    () =>
      menuMaps.map((menu) => {
        const isActive = pathname.includes(menu.href);
        return (
          <Button
            key={menu.title}
            size="small"
            variant={isActive ? 'primary' : 'text'}
            href={menu.href}
            style={{ fontSize: '16px' }}
          >
            {menu.title}
          </Button>
        );
      }),
    [menuMaps, pathname],
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
