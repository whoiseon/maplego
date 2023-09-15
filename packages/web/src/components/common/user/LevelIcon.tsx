import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/react';
import { themedPalette } from '@/styles/palette';

interface Props {
  level: number;
  size?: number;
  hasLevelName?: boolean;
  className?: string;
}

function LevelIcon({
  className,
  level,
  size = 20,
  hasLevelName = false,
}: Props) {
  return (
    <StyledIcon className={className} hasLevelName={hasLevelName}>
      <Image
        src={`/images/level/${level}.svg`}
        width={size}
        height={size}
        alt={`level-icon-${level}`}
      />
      {hasLevelName && <span>브론즈 I 단계</span>}
    </StyledIcon>
  );
}

const StyledIcon = styled.span<{ hasLevelName: boolean }>`
  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  ${({ hasLevelName }) =>
    hasLevelName &&
    css`
      display: inline-flex;
      align-items: center;
      gap: 0 6px;
      padding: 8px 12px;
      border-radius: 4px;
      background: ${themedPalette.bg_page1};
      border: 1px solid ${themedPalette.border3};
      box-shadow: ${themedPalette.shadow2};

      span {
        font-weight: 700;
      }
    `}
`;

export default LevelIcon;
