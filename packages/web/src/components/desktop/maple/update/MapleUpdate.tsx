'use client';

import MapleLayout from '@/components/desktop/maple/MapleLayout';
import UpdateSubMenu from '@/components/desktop/maple/update/UpdateSubMenu';
import { useGetGameUpdateNews } from '@/lib/hooks/queries/game/useGetGameUpdateNews';
import { useParams, useSearchParams } from 'next/navigation';
import MapleBoardList from '@/components/desktop/maple/MapleBoardList';
import MapleGalleryList from '@/components/desktop/maple/MapleGalleryList';
import { useMemo } from 'react';

function MapleUpdate() {
  const query = useSearchParams();
  const target = query.get('target') as string;
  const page = Number(query.get('page'));
  const IsViewPage = useParams().postId !== undefined;

  const { data } = useGetGameUpdateNews(target, page);

  const category = useMemo(() => {
    switch (target) {
      case '0':
        return '본서버';
      case 'tespia':
        return '테스트서버';
      case 'cash':
        return '캐시샵';
      default:
        return '본서버';
    }
  }, [target]);

  return (
    <MapleLayout subMenu={<UpdateSubMenu />}>
      {target === 'cash' ? (
        <MapleGalleryList list={data} />
      ) : (
        <MapleBoardList list={data} route="update" category={category} />
      )}
    </MapleLayout>
  );
}

export default MapleUpdate;
