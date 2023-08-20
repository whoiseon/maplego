import { create } from 'zustand';
import { User } from '@/lib/api/types';

interface UserStore {
  id: number | null;
  username: string | null;
  displayName: string | null;
  level: number | null;
  setUser: (user: User) => void;
}

export const useUser = create<UserStore>((set) => ({
  id: null,
  username: null,
  displayName: null,
  level: null,
  setUser: (user) =>
    set((state) => ({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      level: user.level,
    })),
}));
