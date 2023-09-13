'use client';

import SignUpedBox from '@/components/common/auth/SignUpedBox';
import SignUpForm from '@/components/desktop/auth/SignUpForm';
import { SignUpParams, fetchSignUp } from '@/lib/api/auth';
import { appError } from '@/lib/error';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { SignUpResponse } from '@/lib/api/types';
import { themedPalette } from '@/styles/palette';
import FullHeightPage from '@/components/common/system/FullHeightPage';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import { redirect } from 'next/navigation';

function SignUpPage() {
  // signuped state
  const [isSignUped, setIsSignUped] = useState(false);
  // api request error state
  const [serverError, setServerError] = useState<string>('');

  const { data: meData } = useGetMyAccount();

  if (meData) {
    redirect('/');
  }

  // signup mutation
  const { isLoading, mutate } = useMutation({
    mutationFn: fetchSignUp,
    onMutate: () => {
      setServerError('');
    },
    onSuccess: (data: SignUpResponse) => {
      if (data.registered) {
        setIsSignUped(true);
      }
    },
    onError: (error: any) => {
      console.error(error);
      setServerError('알 수 없는 오류');
    },
  });

  const onSubmit = useCallback(
    ({ displayName, username, password }: SignUpParams) => {
      mutate({ displayName, username, password });
    },
    [mutate],
  );

  return (
    <FullHeightPage>
      <Block>
        {isSignUped ? (
          <SignUpedBox />
        ) : (
          <SignUpForm
            onSubmit={onSubmit}
            serverError={serverError}
            isLoading={isLoading}
          />
        )}
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

export default SignUpPage;
