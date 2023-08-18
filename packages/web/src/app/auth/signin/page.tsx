'use client';

import SignInForm from '@/components/desktop/auth/SignInForm';
import { SignInParams } from '@/lib/api/auth';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

function SignInPage() {
  // api request error state
  const [serverError, setServerError] = useState<string>('');

  const onSubmit = useCallback(({ username, password }: SignInParams) => {
    console.log(username, password);
  }, []);

  return (
    <Block>
      <SignInForm
        onSubmit={onSubmit}
        serverError={serverError}
        setServerError={setServerError}
      />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default SignInPage;
