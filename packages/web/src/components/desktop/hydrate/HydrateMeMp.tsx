import getQueryClient from '@/lib/query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/components/common/hydrate/HydrateOnClient';
import MeMp from '@/components/desktop/profile/meMp/meMp';
import { queryKey } from '@/lib/query/queryKey';
import { cookies } from 'next/headers';
import { fetchGetMyPointHistory } from '@/lib/api/mp';

async function HydrateMeMp() {
  const cookieStore = cookies();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(queryKey.GET_POINT_HISTORY, () => {
    fetchGetMyPointHistory(1, 10, cookieStore.get('access_token')?.value);
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <MeMp />
    </HydrateOnClient>
  );
}

export default HydrateMeMp;
