'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import MoonIcon from '@/assets/images/vectors/icon-moon.svg';
import SunIcon from '@/assets/images/vectors/icon-sun.svg';
import { themedPalette } from '@/styles/palette';
import styled from '@emotion/styled';
import transitions from '@/lib/transitions';

interface Props {}

function ThemeButton({}: Props) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const onClick = () => {
    const mode = theme === 'dark' ? 'light' : 'dark';
    setTheme(mode);
  };

  const transitions = useTransition(isDark, {
    initial: {
      transform: 'scale(1) rotate(0deg)',
      opacity: 1,
    },
    from: {
      transform: 'scale(0) rotate(-180deg)',
      opacity: 0,
    },
    enter: {
      transform: 'scale(1) rotate(0deg)',
      opacity: 1,
    },
    leave: {
      transform: 'scale(0) rotate(180deg)',
      opacity: 0,
    },

    reverse: true,
  });

  if (!mounted) return null;

  return (
    <IconButton onClick={onClick}>
      {transitions((style, item) =>
        item ? (
          <Positioner>
            <AnimatedSVGWrapper style={style}>
              <MoonIcon />
            </AnimatedSVGWrapper>
          </Positioner>
        ) : (
          <Positioner>
            <AnimatedSVGWrapper style={style}>
              <SunIcon />
            </AnimatedSVGWrapper>
          </Positioner>
        ),
      )}
    </IconButton>
  );
}

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  margin-right: 0.25rem;
  color: white;
  position: relative;
  animation: ${transitions.iconSpin} 0.3s ease-in-out;
  transition: background 0.125s ease-in-out;

  &:hover {
    background: ${themedPalette.bg_element2};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Positioner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SVGWrapper = styled.div`
  color: ${themedPalette.text1};
  svg {
    display: block;
  }
`;

const AnimatedSVGWrapper = animated(SVGWrapper);

export default ThemeButton;
