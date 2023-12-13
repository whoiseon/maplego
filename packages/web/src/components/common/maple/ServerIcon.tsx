import Image from 'next/image';
import styled from '@emotion/styled';

interface Props {
  code: number;
  size?: number;
}

function ServerIcon({ code, size = 14 }: Props) {
  return (
    <IconBlock boxSize={size}>
      <Image
        src={`/images/server/${code}.png`}
        width={size}
        height={size}
        alt={`server-icon-${code}`}
      />
    </IconBlock>
  );
}

const IconBlock = styled.div<{ boxSize: number }>`
  display: flex;
  align-content: center;
  justify-content: center;
  width: ${({ boxSize }) => boxSize}px;
  height: ${({ boxSize }) => boxSize}px;
`;

export default ServerIcon;
