import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';

interface Props {
  point: number;
}

function HeaderMpBox({ point }: Props) {
  return (
    <Block href="/me/mp">
      <PointSymbol>MP</PointSymbol>
      <span>{point?.toLocaleString()}</span>
    </Block>
  );
}

const Block = styled(Link)`
  width: 160px;
  height: 34px;
  border-radius: 50px;
  background: ${themedPalette.bg_element2};
  border: 1px solid ${themedPalette.border4};
  box-shadow: ${themedPalette.shadow2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;

  span {
    font-size: 14px;
    font-weight: 600;
    color: ${themedPalette.text1};
  }
`;

const PointSymbol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: ${themedPalette.primary2};
`;

export default HeaderMpBox;
