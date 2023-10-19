import { ReactNode } from 'react';
import NoticeViewLayout from '@/components/desktop/maple/notice/NoticeViewLayout';

function NoticeViewPageLayout({ children }: { children: ReactNode }) {
  return <NoticeViewLayout>{children}</NoticeViewLayout>;
}

export default NoticeViewPageLayout;
