import getQueryClient from '@/lib/query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/components/common/hydrate/HydrateOnClient';
import { queryKey } from '@/lib/query/queryKey';
import MapleEventView from '@/components/desktop/maple/event/MapleEventView';
import { headers } from 'next/headers';
import {
  fetchGetGameEventView,
  fetchGetGameUpdateNewsView,
} from '@/lib/api/game';
import MapleUpdateView from '@/components/desktop/maple/update/MapleUpdateView';

interface QueryParams {
  page: string;
  target: string;
}

async function HydrateMapleUpdateView() {
  const headerStore = headers();
  const queryClient = getQueryClient();

  const query: QueryParams = JSON.parse(
    decodeURIComponent(headerStore.get('x-invoke-query') as string),
  );
  const pathname = headerStore.get('x-invoke-path') as string;
  const postId = Number(pathname.split('/').pop());

  const target = query.target || '';

  await queryClient.prefetchQuery(
    queryKey.GET_GAME_UPDATE_NEWS_VIEW(postId, target),
    () => fetchGetGameUpdateNewsView(postId, target),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <MapleUpdateView />
    </HydrateOnClient>
  );
}

export default HydrateMapleUpdateView;
