import { create } from 'zustand';
import { User } from '@/lib/api/types';
import { persist } from 'zustand/middleware';

interface UserStore {
  id: number | null;
  username: string | null;
  displayName: string | null;
  profileImage: string | null;
  level: number | null;
  setUser: (user: User) => void;
}

export const useUser = create<UserStore>((set) => ({
  id: null,
  username: null,
  displayName: null,
  profileImage: null,
  level: null,
  setUser: (user: User) =>
    set((state) => ({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      profileImage: user.profileImage,
      level: user.level,
    })),
}));

// export const useUser = create<UserStore>()(
//   persist<UserStore>(
//     (set, get) => ({
//       id: null,
//       username: null,
//       displayName: null,
//       level: null,
//     }),
//     {
//       name: 'CURRENT_USER',
//     },
//   ),
// );
