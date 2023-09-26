import getQueryClient from '@/lib/query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/components/common/hydrate/HydrateOnClient';
import MeMp from '@/components/desktop/profile/meMp/MeMp';
import { queryKey } from '@/lib/query/queryKey';
import { cookies, headers } from 'next/headers';
import { fetchGetMyPointHistory } from '@/lib/api/mp';

interface QueryParams {
  page: string;
  target: string;
  start: string;
  end: string;
}

async function HydrateMeMp() {
  const cookieStore = cookies();
  const headerStore = headers();
  const queryClient = getQueryClient();

  const query: QueryParams = JSON.parse(
    decodeURIComponent(headerStore.get('x-invoke-query') as string),
  );

  await queryClient.prefetchQuery(
    queryKey.GET_POINT_HISTORY(
      Number(query.page) || 1,
      query.target || '',
      query.start || '',
      query.end || '',
    ),
    () =>
      fetchGetMyPointHistory({
        page: Number(query.page) || 1,
        show: 20,
        target: query.target || '',
        startDate: query.start || '',
        endDate: query.end || '',
        accessToken: cookieStore.get('access_token')?.value,
      }),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <MeMp />
    </HydrateOnClient>
  );
}

export default HydrateMeMp;
