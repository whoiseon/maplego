import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const modalOpen = keyframes`
    0% {
        opacity: 0;
        transform: scale(0);
    }
    70% {
        transform: scale(1.06);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

const modalClose = keyframes`
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
`;

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
  modalOpen,
  modalClose,
  fadeIn,
  fadeOut,
  iconSpin,
};

export default transitions;