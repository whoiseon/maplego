'use client';

import styled from '@emotion/styled';
import ProfileEditCard from '@/components/desktop/profile/meProfile/ProfileEditCard';
import LevelCheckCard from '@/components/desktop/profile/meProfile/LevelCheckCard';
import EmailVerifyCard from '@/components/desktop/profile/meProfile/EmailVerifyCard';

function MeProfile() {
  return (
    <Block>
      <LevelCheckCard />
      <ProfileEditCard />
      <EmailVerifyCard />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
`;

export default MeProfile;
