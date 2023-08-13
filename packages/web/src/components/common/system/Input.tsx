import React from "react";
import { themedPalette } from "@/styles/palette";
import styled from "@emotion/styled";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input(props: InputProps) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  background-color: ${themedPalette.bg_element1};
  height: 42px;
  border-radius: 6px;
  transition: all 0.125s ease-in-out;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  padding-left: 16px;
  padding-right: 16px;
  color: ${themedPalette.text1};
  border: 1px solid ${themedPalette.border3};

  &:focus {
    border: 1px solid ${themedPalette.primary1};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: ${themedPalette.text3};
  }

  &:disabled {
    opacity: 0.3;
    &:hover,
    :focus {
      background-color: ${themedPalette.bg_element2};
      border: none;
      box-shadow: none;
    }
  }
`;

export default Input;
