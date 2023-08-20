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
        transform: scale(1.03);
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

const errorBounce = keyframes`
    0% {
        transform: translateY(0)
    }
    20% {
        transform: translateY(-3px);
    }
    40% {
        transform: translateY(0)
    }
    80% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0)
    }
`;

const transitions = {
  modalOpen,
  modalClose,
  fadeIn,
  fadeOut,
  iconSpin,
  errorBounce,
};

export default transitions;
