'use client';

import styled from '@emotion/styled';
import LevelCheckCard from '@/components/desktop/profile/meLevel/LevelCheckCard';
import MeLayout from '@/components/desktop/profile/MeLayout';

function MeLevel() {
  return (
    <MeLayout>
      <Block>
        <LevelCheckCard hasLink={false} />
      </Block>
    </MeLayout>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
`;

export default MeLevel;
