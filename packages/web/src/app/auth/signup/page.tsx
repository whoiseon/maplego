'use client';

import SignUpedBox from '@/components/common/auth/SignUpedBox';
import SignUpForm, {
  CheckDisplayName,
} from '@/components/desktop/auth/SignUpForm';
import { SignUpParams, fetchSignUp } from '@/lib/api/auth';
import { appError } from '@/lib/error';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { themedPalette } from '@/styles/palette';
import FullHeightPage from '@/components/common/system/FullHeightPage';
import { useGetMyAccount } from '@/lib/hooks/queries/me/useGetMyAccount';
import { redirect } from 'next/navigation';

function SignUpPage() {
  // signuped state
  const [isSignUpped, setIsSignUpped] = useState(false);
  const [checkDisplayName, setCheckDisplayName] = useState<CheckDisplayName>({
    statusCode: 0,
    message: '',
  });
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
    onSuccess: (data) => {
      console.log(data);
      if (data.statusCode !== 200) {
        setServerError(appError(data.name));

        return;
      }

      setIsSignUpped(true);
    },
    onError: (error: any) => {},
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
        {isSignUpped ? (
          <SignUpedBox />
        ) : (
          <SignUpForm
            onSubmit={onSubmit}
            serverError={serverError}
            isLoading={isLoading}
            checkDisplayName={checkDisplayName}
            setCheckDisplayName={setCheckDisplayName}
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
