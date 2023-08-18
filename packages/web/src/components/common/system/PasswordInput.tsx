'use client';

import { themedPalette } from '@/styles/palette';
import styled from '@emotion/styled';
import { InputProps, StyledInput } from './Input';
import PasswordEyeIcon from '@/assets/images/vectors/password-eye-icon.svg';
import PasswordEyeCloseIcon from '@/assets/images/vectors/password-eye-close-icon.svg';
import { memo, useCallback, useState } from 'react';
import transitions from '@/lib/transitions';

interface Props extends InputProps {}

function PasswordInput({
  type,
  register,
  errors,
  options,
  ...rest
}: InputProps) {
  const [isHover, setIsHover] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [isClicked, setIsClicked] = useState(false);

  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  const onToggleInputType = useCallback(() => {
    setIsClicked((prev) => !prev);
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  }, []);

  if (register) {
    return (
      <PasswordBlock
        isClicked={isClicked}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <StyledInput
          type={inputType}
          {...register(rest.name, options)}
          {...rest}
        />
        {(isHover || isClicked) && (
          <button type="button" onClick={onToggleInputType}>
            {isClicked ? <PasswordEyeCloseIcon /> : <PasswordEyeIcon />}
          </button>
        )}
        {errors && <InputError>{errors.message}</InputError>}
      </PasswordBlock>
    );
  }

  return (
    <PasswordBlock
      isClicked={isClicked}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <StyledInput type={inputType} {...rest} />
      {(isHover || isClicked) && (
        <button type="button" onClick={onToggleInputType}>
          {isClicked ? <PasswordEyeCloseIcon /> : <PasswordEyeIcon />}
        </button>
      )}
    </PasswordBlock>
  );
}

const PasswordBlock = styled.div<{ isClicked: boolean }>`
  position: relative;
  display: flex;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 16px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;

    svg {
      color: ${themedPalette.text4};
      transition: all 0.125s ease-in-out;
      ${({ isClicked }) => (isClicked ? `color: ${themedPalette.text1};` : '')}

      &:hover {
        color: ${themedPalette.text2};
      }
    }
  }
`;

const InputError = styled.p`
  position: absolute;
  top: -22px;
  right: 0;
  font-size: 0.875rem;
  color: ${themedPalette.danger1};
  animation: ${transitions.errorBounce} 0.4s ease-in-out;
`;

export default memo(PasswordInput);
