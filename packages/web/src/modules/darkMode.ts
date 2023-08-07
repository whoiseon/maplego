import { create } from 'zustand';

export interface DarkModeStore {
  theme: 'dark' | 'light' | 'default';
  systemTheme: 'dark' | 'light' | 'not-ready';
  enableDarkMode: () => void;
  enableLightMode: () => void;
  setSystemTheme: (payload: 'dark' | 'light') => void;
}

const useDarkMode = create<DarkModeStore>((set) => ({
  theme: 'default',
  systemTheme: 'not-ready',
  enableDarkMode: () => set({ theme: 'dark' }),
  enableLightMode: () => set({ theme: 'light' }),
  setSystemTheme: (payload: 'dark' | 'light') =>
    set({
      systemTheme: payload,
    }),
}));
