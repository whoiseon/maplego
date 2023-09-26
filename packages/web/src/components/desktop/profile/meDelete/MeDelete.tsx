'use client';

import styled from '@emotion/styled';
import AccountDeleteCard from '@/components/desktop/profile/meDelete/AccountDeleteCard';

function MeDelete() {
  return (
    <Block>
      <AccountDeleteCard />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
`;

export default MeDelete;
