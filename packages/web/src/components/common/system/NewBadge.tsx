import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

function NewBadge() {
  return <StyledBadge>N</StyledBadge>;
}

const StyledBadge = styled.span`
  display: inline-flex;
  padding: 1px 3px;
  font-size: 10px;
  border-radius: 4px;
  background: ${themedPalette.primary2};
  border: 1px solid ${themedPalette.button_border1};
  box-shadow: ${themedPalette.shadow2};
  color: ${themedPalette.button_text1};
  font-weight: bold;
`;

export default NewBadge;
