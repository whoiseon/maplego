import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';
import PointIcon from '@/components/common/system/PointIcon';

interface Props {
  point: number;
}

function HeaderMpBox({ point }: Props) {
  return (
    <Block href="/me/mp">
      <PointIcon />
      <span className="point-value">{point?.toLocaleString()}</span>
    </Block>
  );
}

const Block = styled(Link)`
  width: 160px;
  height: 34px;
  border-radius: 50px;
  background: ${themedPalette.bg_element2};
  border: 1px solid ${themedPalette.border3};
  box-shadow: ${themedPalette.shadow2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  transition: all 0.2s ease-in-out;

  span.point-value {
    font-size: 14px;
    font-weight: 600;
    color: ${themedPalette.text1};
  }

  &:hover {
    background: ${themedPalette.bg_element3};
    border: 1px solid ${themedPalette.primary2};
  }
`;

export default HeaderMpBox;
