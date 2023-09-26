'use client';

import MapleLayout from '@/components/desktop/maple/MapleLayout';
import styled from '@emotion/styled';

function MapleHome() {
  return (
    <MapleLayout>
      <Block>메이플 홈</Block>
    </MapleLayout>
  );
}

const Block = styled.article`
  display: flex;
`;

export default MapleHome;
