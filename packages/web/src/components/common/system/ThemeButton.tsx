"use client";

import { useTheme } from "next-themes";
import { setCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";
import MoonIcon from "@/assets/images/vectors/icon-moon.svg";
import SunIcon from "@/assets/images/vectors/icon-sun.svg";
import tw, { styled } from "twin.macro";
import { css } from "@emotion/react";

interface Props {}

function ThemeButton({}: Props) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const cookies = parseCookies();
    if (!cookies.theme) {
      setCookie(null, "theme", systemTheme || "light");
    }
  }, []);

  const onClick = () => {
    const mode = theme === "dark" ? "light" : "dark";
    setTheme(mode);
    setCookie(null, "theme", mode);
  };

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const transitions = useTransition(isDark, {
    initial: {
      transform: "scale(1) rotate(0deg)",
      opacity: 1,
    },
    from: {
      transform: "scale(0) rotate(-180deg)",
      opacity: 0,
    },
    enter: {
      transform: "scale(1) rotate(0deg)",
      opacity: 1,
    },
    leave: {
      transform: "scale(0) rotate(180deg)",
      opacity: 0,
    },

    reverse: true,
  });

  if (!mounted) return null;

  return (
    <StyledButton onClick={onClick}>
      {transitions((style, item) => (
        <StyledIcon>
          <animated.div style={style} className="text-text1 w-[24px] h-[24px]">
            {item ? <MoonIcon /> : <SunIcon />}
          </animated.div>
        </StyledIcon>
      ))}
    </StyledButton>
  );
}

const StyledButton = styled.div(() => [
  tw`
    bg-none rounded border-none cursor-pointer w-[34px] h-[34px] text-white relative animate-iconSpin hover:bg-bg_element2
  `,
]);

const StyledIcon = tw.div`
  absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]
`;

export default ThemeButton;
