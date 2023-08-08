import Link from 'next/link';
import { useMemo } from 'react';

interface Props {}

const menuMaps = [
  { title: '메이플', href: '/maple' },
  { title: '정보', href: '/info' },
  { title: '커뮤니티', href: '/post/all' },
  { title: '마켓', href: '/market' },
  { title: '경매장', href: '/auction', notReady: true },
];

function HeaderNavList({}: Props) {
  const renderMenuItem = useMemo(
    () =>
      menuMaps.map((menu) => (
        <li key={menu.title}>
          <Link
            href={menu.href}
            className="text-text1 px-3 py-2 rounded hover:bg-bg_element2 font-medium">
            {menu.title}
          </Link>
        </li>
      )),
    [menuMaps]
  );

  return (
    <nav>
      <ul className="flex items-center gap-[2px]">{renderMenuItem}</ul>
    </nav>
  );
}

export default HeaderNavList;
