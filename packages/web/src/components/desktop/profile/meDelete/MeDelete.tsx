'use client';

import styled from '@emotion/styled';
import AccountDeleteCard from '@/components/desktop/profile/meDelete/AccountDeleteCard';
import MeLayout from '@/components/desktop/profile/MeLayout';

function MeDelete() {
  return (
    <MeLayout>
      <Block>
        <AccountDeleteCard />
      </Block>
    </MeLayout>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
`;

export default MeDelete;
