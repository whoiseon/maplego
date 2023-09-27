'use client';

import MapleLayout from '@/components/desktop/maple/MapleLayout';
import UpdateSubMenu from '@/components/desktop/maple/update/UpdateSubMenu';
import { useGetGameUpdateNews } from '@/lib/hooks/queries/game/useGetGameUpdateNews';
import { useSearchParams } from 'next/navigation';
import MapleBoardList from '@/components/desktop/maple/MapleBoardList';
import MapleGalleryList from '@/components/desktop/maple/MapleGalleryList';

function MapleUpdate() {
  const query = useSearchParams();
  const target = query.get('target') as string;
  const page = Number(query.get('page'));

  const { data } = useGetGameUpdateNews(target, page);

  return (
    <MapleLayout subMenu={<UpdateSubMenu />}>
      {target === 'cash' ? (
        <MapleGalleryList list={data} />
      ) : (
        <MapleBoardList list={data} />
      )}
    </MapleLayout>
  );
}

export default MapleUpdate;
