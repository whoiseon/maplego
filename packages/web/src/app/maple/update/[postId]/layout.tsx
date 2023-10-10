import { ReactNode } from 'react';
import UpdateViewLayout from '@/components/desktop/maple/update/UpdateViewLayout';

function UpdateViewPageLayout({ children }: { children: ReactNode }) {
  return <UpdateViewLayout>{children}</UpdateViewLayout>;
}

export default UpdateViewPageLayout;
