import getQueryClient from '@/lib/query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/components/common/hydrate/HydrateOnClient';
import { queryKey } from '@/lib/query/queryKey';
import MapleEventView from '@/components/desktop/maple/event/MapleEventView';
import { headers } from 'next/headers';
import { fetchGetGameEventView } from '@/lib/api/game';

interface QueryParams {
  eventId: string;
}

async function HydrateMapleEventView() {
  const queryClient = getQueryClient();
  const headerStore = headers();

  const pathname = headerStore.get('x-invoke-path') as string;
  const eventId = Number(pathname.split('/').pop());

  await queryClient.prefetchQuery(queryKey.GET_GAME_EVENT_VIEW(eventId), () =>
    fetchGetGameEventView(eventId),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <MapleEventView />
    </HydrateOnClient>
  );
}

export default HydrateMapleEventView;
