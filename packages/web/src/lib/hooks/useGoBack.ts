'use client';

import { useRouter } from 'next/navigation';

export function useGoBack(): () => void {
  const router = useRouter();
  return () => router.back();
}
