import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

interface Props {
  layout?: 'full' | 'inline';
  fontSize?: number;
}

function PointIcon({ layout = 'full', fontSize = 12 }: Props) {
  return (
    <StyledIcon layout={layout} fontSize={fontSize}>
      MP
    </StyledIcon>
  );
}

const StyledIcon = styled.span<{ layout: 'full' | 'inline'; fontSize: number }>`
  display: ${({ layout }) => (layout === 'full' ? 'flex' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: bold;
  color: ${themedPalette.primary2};
`;

export default PointIcon;
