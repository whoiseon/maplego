"use client";

import SignUpForm from "@/components/desktop/auth/SignUpForm";
import styled from "@emotion/styled";

function SignUpPage() {
  return (
    <Block>
      <SignUpForm />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default SignUpPage;
