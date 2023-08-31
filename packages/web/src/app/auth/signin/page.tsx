'use client';

import SignInForm from '@/components/desktop/auth/SignInForm';
import { fetchSignIn, SignInParams } from '@/lib/api/auth';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { appError } from '@/lib/error';
import { useRouter } from 'next/navigation';
import { useUser } from '@/states/user';
import { SignInResponse } from '@/lib/api/types';
import { themedPalette } from '@/styles/palette';
import FullHeightPage from '@/components/common/system/FullHeightPage';

function SignInPage() {
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
    onSuccess: (data: SignInResponse) => {
      if (data.statusCode === 0) {
        router.push('/');
        // setUser({
        //   displayName: data.payload.user.displayName,
        //   username: data.payload.user.username,
        //   id: data.payload.user.id,
        //   level: data.payload.user.level,
        // });
      } else {
        setServerError(appError(data.name, data.payload));
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
