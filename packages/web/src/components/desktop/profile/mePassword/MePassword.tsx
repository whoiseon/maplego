'use client';

import styled from '@emotion/styled';
import PasswordChangeCard from '@/components/desktop/profile/mePassword/PasswordChangeCard';
import MeLayout from '@/components/desktop/profile/MeLayout';

function MePassword() {
  return (
    <MeLayout>
      <Block>
        <PasswordChangeCard />
      </Block>
    </MeLayout>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
`;

export default MePassword;
