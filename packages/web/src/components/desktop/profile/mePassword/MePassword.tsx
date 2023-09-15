'use client';

import styled from '@emotion/styled';
import PasswordChangeCard from '@/components/desktop/profile/mePassword/PasswordChangeCard';

function MePassword() {
  return (
    <Block>
      <PasswordChangeCard />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
`;

export default MePassword;
