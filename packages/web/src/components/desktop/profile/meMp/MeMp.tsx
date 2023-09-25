'use client';

import styled from '@emotion/styled';
import PointCheckCard from '@/components/desktop/profile/meMp/PointCheckCard';
import MPHistory from '@/components/desktop/profile/meMp/MPHistory';

function MeMp() {
  return (
    <Block>
      <PointCheckCard hasLink={false} />
      <MPHistory />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
`;

export default MeMp;
