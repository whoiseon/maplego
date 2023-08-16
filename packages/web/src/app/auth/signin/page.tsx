'use client';

import SignInForm from '@/components/desktop/auth/SignInForm';
import styled from '@emotion/styled';

function SignInPage() {
  return (
    <Block>
      <SignInForm />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default SignInPage;
