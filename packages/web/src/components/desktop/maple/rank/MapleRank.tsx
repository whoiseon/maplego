'use client';

import MapleLayout from '@/components/desktop/maple/MapleLayout';
import MapleRankList from '@/components/desktop/maple/rank/MapleRankList';
import MapleRankSubMenu from '@/components/desktop/maple/rank/MapleRankSubMenu';

function MapleRank() {
  return (
    <MapleLayout subMenu={<MapleRankSubMenu />}>
      <MapleRankList />
    </MapleLayout>
  );
}

export default MapleRank;
