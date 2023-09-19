import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

interface Props {
  size?: number;
}

function Spinner({ size = 24 }: Props) {
  return (
    <Block size={size}>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
      </svg>
    </Block>
  );
}

const Block = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  margin: 0;

  .spinner {
    animation: rotate 2s linear infinite;
    margin: 0;
    z-index: 2;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    color: ${themedPalette.button_text1};

    & .path {
      stroke: hsl(210, 70, 75);
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default Spinner;
