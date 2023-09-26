import { ReactNode } from 'react';
import MeLayout from '@/components/desktop/profile/MeLayout';

function MePageLayout({ children }: { children: ReactNode }) {
  return <MeLayout>{children}</MeLayout>;
}

export default MePageLayout;
