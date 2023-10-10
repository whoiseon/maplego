'use client';

import { ReactNode, useMemo } from 'react';
import MapleBoardLayout from '@/components/desktop/maple/MapleBoardLayout';
import MapleUpdate from '@/components/desktop/maple/update/MapleUpdate';

function UpdateViewLayout({ children }: { children: ReactNode }) {
  return <MapleBoardLayout title="업데이트">{children}</MapleBoardLayout>;
}

export default UpdateViewLayout;
