'use client';

import styled from '@emotion/styled';
import LevelCheckCard from '@/components/desktop/profile/meLevel/LevelCheckCard';

function MeLevel() {
  return (
    <Block>
      <LevelCheckCard hasLink={false} />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
`;

export default MeLevel;
