'use client';

import { ReactNode, useMemo } from 'react';
import MapleBoardLayout from '@/components/desktop/maple/MapleBoardLayout';

function NoticeViewLayout({ children }: { children: ReactNode }) {
  return <MapleBoardLayout title="공지사항">{children}</MapleBoardLayout>;
}

export default NoticeViewLayout;
