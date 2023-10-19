import getQueryClient from '@/lib/query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/components/common/hydrate/HydrateOnClient';
import { queryKey } from '@/lib/query/queryKey';
import MapleEventView from '@/components/desktop/maple/event/MapleEventView';
import { headers } from 'next/headers';
import {
  fetchGetGameEventView,
  fetchGetGameNoticeView,
  fetchGetGameUpdateNewsView,
} from '@/lib/api/game';
import MapleUpdateView from '@/components/desktop/maple/update/MapleUpdateView';
import MapleNoticeView from '@/components/desktop/maple/notice/MapleNoticeView';

interface QueryParams {
  page: string;
  target: string;
}

async function HydrateMapleNoticeView() {
  const headerStore = headers();
  const queryClient = getQueryClient();

  const query: QueryParams = JSON.parse(
    decodeURIComponent(headerStore.get('x-invoke-query') as string),
  );
  const pathname = headerStore.get('x-invoke-path') as string;
  const postId = Number(pathname.split('/').pop());

  const target = query.target || 'all';

  console.log('target', target);
  console.log('postId', postId);

  await queryClient.prefetchQuery(
    queryKey.GET_GAME_NOTICE_VIEW(postId, target),
    () => fetchGetGameNoticeView(postId, target),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <MapleNoticeView />
    </HydrateOnClient>
  );
}

export default HydrateMapleNoticeView;
