'use client';

import MapleLayout from '@/components/desktop/maple/MapleLayout';
import { useSearchParams } from 'next/navigation';
import { useGetGameNotice } from '@/lib/hooks/queries/game/useGetGameNotice';
import MapleBoardList from '@/components/desktop/maple/MapleBoardList';
import NoticeSubMenu from '@/components/desktop/maple/notice/NoticeSubMenu';

function MapleNotice() {
  const query = useSearchParams();
  const target = query.get('target') as string;
  const page = Number(query.get('page'));

  const { data } = useGetGameNotice(target, page);

  return (
    <MapleLayout subMenu={<NoticeSubMenu />}>
      <MapleBoardList list={data} route="notice" />
    </MapleLayout>
  );
}

export default MapleNotice;
