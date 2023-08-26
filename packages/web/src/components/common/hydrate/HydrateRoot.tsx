import { cookies } from 'next/headers';
import HydrateOnClient from './HydrateOnClient';
import getQueryClient from '@/lib/query/getQueryClient';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetMe, fetchGetMeOnServer } from '@/lib/api/me';
import { dehydrate } from '@tanstack/react-query';
import React from 'react';
import { User } from '@/lib/api/types';
import { endpoint } from '@/lib/api/endpoint';
import { fetchRefresh } from '@/lib/api/auth';
import { NextResponse } from 'next/server';

async function HydrateRoot({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(queryKey.GET_ME, () =>
    fetchGetMeOnServer(
      cookieStore.get('access_token')?.value,
      cookieStore.get('refresh_token')?.value,
    ),
  );

  const dehydratedState = dehydrate(queryClient);

  return <HydrateOnClient state={dehydratedState}>{children}</HydrateOnClient>;
}

export default HydrateRoot;
