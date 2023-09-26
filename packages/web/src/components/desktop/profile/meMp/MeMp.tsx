'use client';

import styled from '@emotion/styled';
import PointCheckCard from '@/components/desktop/profile/meMp/PointCheckCard';
import MPHistory from '@/components/desktop/profile/meMp/MPHistory';
import MeLayout from '@/components/desktop/profile/MeLayout';

function MeMp() {
  return (
    <MeLayout>
      <Block>
        <PointCheckCard hasLink={false} />
        <MPHistory />
      </Block>
    </MeLayout>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
`;

export default MeMp;
