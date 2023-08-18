'use client';

import SignUpedBox from '@/components/common/auth/SignUpedBox';
import SignUpForm from '@/components/desktop/auth/SignUpForm';
import { SignUpParams, fetchSignUp } from '@/lib/api/auth';
import { appError } from '@/lib/error';
import { SignUpResponseType } from '@/lib/models/auth';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

function SignUpPage() {
  // signuped state
  const [isSignUped, setIsSignUped] = useState(false);
  // api request error state
  const [serverError, setServerError] = useState<string>('');

  // signup mutation
  const { isLoading, mutate } = useMutation({
    mutationFn: fetchSignUp,
    onMutate: () => {
      setServerError('');
    },
    onSuccess: (data: SignUpResponseType) => {
      if (data.statusCode === 201) {
        setIsSignUped(true);
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
    ({ displayName, username, password }: SignUpParams) => {
      mutate({ displayName, username, password });
    },
    [mutate],
  );

  return (
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
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default SignUpPage;
