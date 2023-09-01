import { cookies } from 'next/headers';
import HydrateOnClient from './HydrateOnClient';
import getQueryClient from '@/lib/query/getQueryClient';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetMeOnServer } from '@/lib/api/me';
import { dehydrate } from '@tanstack/react-query';
import React from 'react';

async function HydrateRoot({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const queryClient = getQueryClient();
  const isSignedIn = !!cookieStore.get('access_token')?.value;

  // prefetch isSignedIn
  await queryClient.setQueryData(queryKey.IS_SIGNED_IN, isSignedIn);

  // prefetch me
  if (isSignedIn) {
    await queryClient.prefetchQuery(queryKey.GET_ME, () =>
      fetchGetMeOnServer(
        cookieStore.get('access_token')?.value,
        cookieStore.get('refresh_token')?.value,
      ),
    );
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrateOnClient state={dehydratedState}>{children}</HydrateOnClient>;
}

export default HydrateRoot;
