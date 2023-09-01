'use client';

import SignInForm from '@/components/desktop/auth/SignInForm';
import { fetchSignIn, SignInParams } from '@/lib/api/auth';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appError } from '@/lib/error';
import { useRouter } from 'next/navigation';
import { useUser } from '@/states/user';
import { SignInResponse, User } from '@/lib/api/types';
import { themedPalette } from '@/styles/palette';
import FullHeightPage from '@/components/common/system/FullHeightPage';
import { queryKey } from '@/lib/query/queryKey';

function SignInPage() {
  const queryClient = useQueryClient();
  const { setUser, displayName } = useUser();
  const router = useRouter();

  // api request error state
  const [serverError, setServerError] = useState<string>('');

  // signin mutation
  const { isLoading, mutate } = useMutation({
    mutationFn: fetchSignIn,
    onMutate: () => {
      setServerError('');
    },
    onSuccess: async (data: SignInResponse) => {
      if (data.statusCode === 0) {
        router.push('/');
        await queryClient.invalidateQueries(queryKey.GET_ME);
        // queryClient.setQueryData(queryKey.IS_SIGNED_IN, true);

        setUser({
          displayName: data.payload.user.displayName,
          level: data.payload.user.level,
          id: data.payload.user.id,
          username: data.payload.user.username,
        } as User);
      } else {
        setServerError(appError(data.name as string, data.payload));
      }
    },
    onError: (error: any) => {
      console.error(error);
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
