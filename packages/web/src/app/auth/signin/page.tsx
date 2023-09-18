'use client';

import SignInForm from '@/components/desktop/auth/SignInForm';
import { fetchSignIn, SignInParams } from '@/lib/api/auth';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appError } from '@/lib/error';
import { redirect, useRouter } from 'next/navigation';
import { useUser } from '@/states/user';
import { ErrorResponse, SignInResponse, User } from '@/lib/api/types';
import { themedPalette } from '@/styles/palette';
import FullHeightPage from '@/components/common/system/FullHeightPage';
import { queryKey } from '@/lib/query/queryKey';
import { useGetMyAccount } from '@/lib/hooks/mutations/useGetMyAccount';

function SignInPage() {
  const queryClient = useQueryClient();
  const { setUser, displayName } = useUser();
  const router = useRouter();
  const { data: meData } = useGetMyAccount();

  if (meData) {
    redirect('/');
  }

  // api request error state
  const [serverError, setServerError] = useState<string>('');

  // signin mutation
  const { isLoading, mutate } = useMutation({
    mutationFn: fetchSignIn,
    onMutate: () => {
      setServerError('');
    },
    onSuccess: async (data: SignInResponse | ErrorResponse) => {
      if ('name' in data) {
        const error = data as ErrorResponse;
        setServerError(appError(error.name));

        return;
      }

      await queryClient.setQueryData(queryKey.IS_SIGNED_IN, true);
      await queryClient.refetchQueries(queryKey.GET_ME);
    },
    onError: (error: any) => {
      setServerError('알 수 없는 오류');
    },
  });

  const onSubmit = useCallback(
    ({ username, password }: SignInParams) => {
      mutate({ username, password });
    },
    [mutate],
  );

  return (
    <FullHeightPage>
      <Block>
        <SignInForm
          onSubmit={onSubmit}
          serverError={serverError}
          setServerError={setServerError}
        />
      </Block>
    </FullHeightPage>
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${themedPalette.bg_page1};
`;

export default SignInPage;
