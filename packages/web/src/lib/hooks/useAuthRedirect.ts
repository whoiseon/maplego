'use client';

import { useGetMe } from '@/lib/hooks/useGetMe';
import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';

export function useAuthRedirect() {
  const { data: authResult } = useGetMe();

  useEffect(() => {
    if (!authResult) return;
    redirect('/');
  });
}
