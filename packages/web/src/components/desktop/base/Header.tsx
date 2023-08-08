'use client';

import Logo from '@/components/common/base/Logo';
import ThemeButton from '@/components/common/system/ThemeButton';

interface Props {
  theme?: string;
}

function Header({ theme }: Props) {
  return (
    <header className="bg-bg_element1 flex justify-between">
      <Logo theme={theme} />
      <ThemeButton />
    </header>
  );
}

export default Header;
