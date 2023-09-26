import getQueryClient from '@/lib/query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/components/common/hydrate/HydrateOnClient';
import MapleEvent from '@/components/desktop/maple/event/MapleEvent';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetGameEvents } from '@/lib/api/game';

async function HydrateMapleEvent() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(queryKey.GET_GAME_EVENT, fetchGetGameEvents);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <MapleEvent />
    </HydrateOnClient>
  );
}

export default HydrateMapleEvent;
