import styled from '@emotion/styled';
import NoProfileIcon from '@/assets/images/vectors/no-profile-icon.svg';
import { themedPalette } from '@/styles/palette';
import { memo } from 'react';

interface Props {
  size?: number;
}

function NoProfile({ size = 38 }: Props) {
  return (
    <StyledProfile size={size}>
      <NoProfileIcon />
    </StyledProfile>
  );
}

const StyledProfile = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease-in-out;
  border: 2px solid transparent;

  svg {
    width: ${({ size }) => size * 0.5}px;
  }

  &:hover {
    border: 2px solid ${themedPalette.primary2};
  }
`;

export default memo(NoProfile);
