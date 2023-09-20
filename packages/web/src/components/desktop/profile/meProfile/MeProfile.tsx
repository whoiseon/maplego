'use client';

import styled from '@emotion/styled';
import ProfileEditCard from '@/components/desktop/profile/meProfile/ProfileEditCard';
import LevelCheckCard from '@/components/desktop/profile/meLevel/LevelCheckCard';
import EmailVerifyCard from '@/components/desktop/profile/meProfile/EmailVerifyCard';
import PointCheckCard from '@/components/desktop/profile/meMp/PointCheckCard';

function MeProfile() {
  return (
    <Block>
      <CardHalf>
        <LevelCheckCard layout="half" />
        <PointCheckCard layout="half" />
      </CardHalf>
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

const CardHalf = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export default MeProfile;
