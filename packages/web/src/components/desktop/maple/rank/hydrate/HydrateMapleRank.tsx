import { headers } from 'next/headers';
import getQueryClient from '@/lib/query/getQueryClient';
import { fetchGetGameRank } from '@/lib/api/game';
import { queryKey } from '@/lib/query/queryKey';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/components/common/hydrate/HydrateOnClient';
import MapleRank from '@/components/desktop/maple/rank/MapleRank';

interface QueryParams {
  page: string;
  target: string;
  world: string;
}

async function HydrateMapleRank() {
  const headerStore = headers();
  const queryClient = getQueryClient();

  const query: QueryParams = JSON.parse(
    decodeURIComponent(headerStore.get('x-invoke-query') as string),
  );

  const target = query.target || 'all';
  const page = Number(query.page) || 1;
  const world = Number(query.world) || 0;

  await queryClient.prefetchQuery(
    queryKey.GET_GAME_RANK(target, page, world),
    () => fetchGetGameRank(target, page, world),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <MapleRank />
    </HydrateOnClient>
  );
}

export default HydrateMapleRank;
