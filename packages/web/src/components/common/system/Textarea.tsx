import React from 'react';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function Textarea(props: TextareaProps) {
  return <StyledTextarea {...props} />;
}

const StyledTextarea = styled.textarea`
  background-color: ${themedPalette.bg_element1};
  width: 100%;
  height: 100px;
  border-radius: 6px;
  transition: all 0.125s ease-in-out;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  padding: 16px;
  color: ${themedPalette.text1};
  border: 1px solid ${themedPalette.border3};
  box-shadow: ${themedPalette.shadow2};
  resize: none;

  &:focus {
    border: 1px solid ${themedPalette.primary1};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: ${themedPalette.text3};
  }

  &:disabled {
    background: ${themedPalette.bg_page1};
  }
`;

export default Textarea;
