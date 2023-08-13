"use client";

import AuthForm from "@/components/desktop/auth/AuthForm";
import styled from "@emotion/styled";

function SignInPage() {
  return (
    <Block>
      <AuthForm />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default SignInPage;
