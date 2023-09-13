'use client';

import { useUser } from '@/states/user';
import { redirect } from 'next/navigation';

export function useProtectedRoute() {
  const user = useUser();
}
