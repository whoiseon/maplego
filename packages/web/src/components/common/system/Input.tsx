'use client';

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { themedPalette } from '@/styles/palette';
import styled from '@emotion/styled';
import PasswordInput from './PasswordInput';
import { RegisterOptions } from 'react-hook-form/dist/types';
import transitions from '@/lib/transitions';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
  options?: RegisterOptions;
  errors?: any;
}

function Input({ errors, register, options, ...rest }: InputProps) {
  if (rest.type === 'password') {
    return (
      <PasswordInput
        register={register}
        errors={errors}
        options={options}
        {...rest}
      />
    );
  }

  if (register) {
    return (
      <>
        <StyledInput {...register(rest.name, options)} {...rest} />
        {errors && <InputError>{errors.message}</InputError>}
      </>
    );
  }

  return <StyledInput {...rest} />;
}

export const StyledInput = styled.input`
  background-color: ${themedPalette.bg_element1};
  width: 100%;
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

export const InputError = styled.p`
  position: absolute;
  top: 2px;
  right: 0;
  font-size: 0.875rem;
  color: ${themedPalette.danger1};
  animation: ${transitions.errorBounce} 0.4s ease-in-out;
`;

export default Input;
