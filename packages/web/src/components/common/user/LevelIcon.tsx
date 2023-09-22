import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/react';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';

interface Props {
  level: number;
  size?: number;
  hasName?: boolean;
  className?: string;
  href?: string;
}

function LevelIcon({
  className,
  level,
  size = 20,
  href,
  hasName = false,
}: Props) {
  if (href) {
    return (
      <LinkIcon href={href} className={className}>
        <Image
          src={`/images/level/${level}.svg`}
          width={size}
          height={size}
          alt={`level-icon-${level}`}
        />
        <span>브론즈 I 단계</span>
      </LinkIcon>
    );
  }

  return (
    <StyledIcon className={className} hasName={hasName}>
      <Image
        src={`/images/level/${level}.svg`}
        width={size}
        height={size}
        alt={`level-icon-${level}`}
      />
      {hasName && <span>브론즈 I 단계</span>}
    </StyledIcon>
  );
}

const LinkIcon = styled(Link)`
  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  display: inline-flex;
  align-items: center;
  gap: 0 6px;
  padding: 8px 12px;
  border-radius: 4px;
  background: ${themedPalette.bg_page1};
  border: 1px solid ${themedPalette.border3};
  box-shadow: ${themedPalette.shadow2};

  span {
    font-weight: 600;
    color: ${themedPalette.text1};
  }
`;

const StyledIcon = styled.span<{ hasName: boolean }>`
  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  ${({ hasName }) =>
    hasName &&
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
        font-weight: 600;
        color: ${themedPalette.text1};
      }
    `}
`;

export default LevelIcon;
