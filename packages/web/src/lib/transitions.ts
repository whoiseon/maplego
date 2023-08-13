import { keyframes } from "@emotion/react";

const iconSpin = keyframes`
  0% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
`;

const transitions = {
  iconSpin,
};

export default transitions;
