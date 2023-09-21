import styled from '@emotion/styled';
import NoProfileIcon from '@/assets/images/vectors/no-profile-icon.svg';
import { themedPalette } from '@/styles/palette';
import { memo } from 'react';
import { css } from '@emotion/react';

interface Props {
  size?: number;
  onlyImage?: boolean;
}

function NoProfile({ size = 38, onlyImage = false }: Props) {
  return (
    <StyledProfile size={size} onlyImage={onlyImage}>
      <NoProfileIcon />
    </StyledProfile>
  );
}

const StyledProfile = styled.div<{ size: number; onlyImage: boolean }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: ${themedPalette.bg_element2};
  box-shadow: ${themedPalette.shadow2};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease-in-out;
  border: 1px solid ${themedPalette.border3};

  svg {
    width: ${({ size }) => size * 0.5}px;
  }

  &:hover {
    ${({ onlyImage }) =>
      !onlyImage &&
      css`
        border: 1px solid ${themedPalette.primary2};
      `}
  }
`;

export default memo(NoProfile);
