import { useEffect, useState } from 'react';

export function useIsMediaDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window !== undefined) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(isDark);
    }
  }, []);

  return isDark;
}
