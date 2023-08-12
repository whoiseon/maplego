import React from "react";
import tw, { styled } from "twin.macro";
import { css } from "@emotion/react";
import { themedPalette } from "@/styles/palette";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input(props: InputProps) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input(() => [
  tw`
    bg-bg_page2 border-border3 border-[1px] rounded outline-none h-[42px] text-text1 px-4
  `,
  css`
    transition: border 0.125s ease-in-out;

    &:focus {
      border: 1px solid ${themedPalette.primary1};
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
    }

    &::placeholder {
      color: ${themedPalette.text3};
    }
  `,
]);

export default Input;
