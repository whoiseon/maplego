'use client';

import { useUser } from '@/states/user';
import { redirect } from 'next/navigation';
import { useGetMyAccount } from '@/lib/hooks/queries/useGetMyAccount';

export function useProtectedRoute() {
  const { data: meData } = useGetMyAccount();

  if (!meData) {
    window.location.href = '/auth/signin';
    return;
  }
}
