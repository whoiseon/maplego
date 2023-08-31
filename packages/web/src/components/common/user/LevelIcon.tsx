import styled from '@emotion/styled';
import Image from 'next/image';

interface Props {
  level: number;
  size?: number;
}

function LevelIcon({ level, size = 20 }: Props) {
  return (
    <StyledIcon>
      <Image
        src={`/images/level/${level}.svg`}
        width={size}
        height={size}
        alt={`level-icon-${level}`}
      />
    </StyledIcon>
  );
}

const StyledIcon = styled.span`
  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
`;

export default LevelIcon;
