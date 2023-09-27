import getQueryClient from '@/lib/query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/components/common/hydrate/HydrateOnClient';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetGameUpdateNews } from '@/lib/api/game';
import { headers } from 'next/headers';
import MapleUpdate from '@/components/desktop/maple/update/MapleUpdate';

interface QueryParams {
  page: string;
  target: string;
}

async function HydrateMapleUpdate() {
  const headerStore = headers();
  const queryClient = getQueryClient();

  const query: QueryParams = JSON.parse(
    decodeURIComponent(headerStore.get('x-invoke-query') as string),
  );

  const target = query.target || '';
  const page = Number(query.page);

  await queryClient.prefetchQuery(
    queryKey.GET_GAME_UPDATE_NEWS(target, page),
    () => fetchGetGameUpdateNews(target, page),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <MapleUpdate />
    </HydrateOnClient>
  );
}

export default HydrateMapleUpdate;
