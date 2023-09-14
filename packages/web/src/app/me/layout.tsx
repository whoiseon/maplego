import type { Metadata } from 'next';
import { ReactNode } from 'react';
import MeLayout from '@/components/desktop/profile/MeLayout';

export default async function MePageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <MeLayout>{children}</MeLayout>;
}
