'use client';

import { useTheme } from 'next-themes';
import { setCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';

interface Props {}

function ThemeButton({}: Props) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onClick = (mode: string) => () => {
    setTheme(mode);
    setCookie(null, 'theme', mode);
  };

  const currentTheme = theme === 'system' ? systemTheme : theme;

  if (!mounted) return null;

  return (
    <div>
      {currentTheme === 'dark' ? (
        <button type="button" onClick={onClick('light')}>
          라이트모드
        </button>
      ) : (
        <button type="button" onClick={onClick('dark')}>
          다크모드
        </button>
      )}
    </div>
  );
}

export default ThemeButton;
