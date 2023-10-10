import getQueryClient from '@/lib/query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/components/common/hydrate/HydrateOnClient';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetGameNotice, fetchGetGameUpdateNews } from '@/lib/api/game';
import { headers } from 'next/headers';
import MapleNotice from '@/components/desktop/maple/notice/MapleNotice';

interface QueryParams {
  page: string;
  target: string;
}

async function HydrateMapleNotice() {
  const headerStore = headers();
  const queryClient = getQueryClient();

  const query: QueryParams = JSON.parse(
    decodeURIComponent(headerStore.get('x-invoke-query') as string),
  );

  const target = query.target || '';
  const page = Number(query.page);

  await queryClient.prefetchQuery(queryKey.GET_GAME_NOTICE(target, page), () =>
    fetchGetGameNotice(target, page),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <MapleNotice />
    </HydrateOnClient>
  );
}

export default HydrateMapleNotice;
