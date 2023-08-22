import { cookies } from 'next/headers';
import HydrateOnClient from './HydrateOnClient';
import getQueryClient from '@/lib/query/getQueryClient';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetMe } from '@/lib/api/me';
import { dehydrate } from '@tanstack/react-query';

async function HydrateRoot({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(queryKey.GET_ME, () =>
    fetchGetMe(cookieStore.get('access_token')?.value),
  );

  const dehydratedState = dehydrate(queryClient);

  return <HydrateOnClient state={dehydratedState}>{children}</HydrateOnClient>;
}
