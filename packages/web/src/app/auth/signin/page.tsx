'use client';

import SignInForm from '@/components/desktop/auth/SignInForm';
import { fetchSignIn, SignInParams } from '@/lib/api/auth';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appError } from '@/lib/error';
import { useRouter } from 'next/navigation';
import { useUser } from '@/states/user';
import { themedPalette } from '@/styles/palette';
import FullHeightPage from '@/components/common/system/FullHeightPage';
import { queryKey } from '@/lib/query/queryKey';
import { useGetMyAccount } from '@/lib/hooks/queries/useGetMyAccount';

function SignInPage() {
  const queryClient = useQueryClient();
  const { data: meData } = useGetMyAccount();

  if (meData) {
    window.location.href = '/';
  }

  // api request error state
  const [serverError, setServerError] = useState<string>('');

  // signin mutation
  const { isLoading, mutate } = useMutation({
    mutationFn: fetchSignIn,
    onMutate: () => {
      setServerError('');
    },
    onSuccess: async (data) => {
      if (data.statusCode !== 200) {
        setServerError(appError(data.name));

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
          isLoading={isLoading}
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
