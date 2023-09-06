import Input, { InputProps } from '@/components/common/system/Input';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import React, { useMemo } from 'react';
import SearchIcon from '@/assets/images/vectors/search-icon.svg';
import button from '@/components/common/system/Button';
import { ChangeEventType } from '@/lib/hooks/useInput';

interface Props extends InputProps {
  selectOptions: {
    value: string;
    label: string;
  }[];
  selectValue: string;
  onChangeSelectValue: (e: ChangeEventType) => void;
  onSubmitSearch?: (e: React.FormEvent<HTMLFormElement>) => void;
}

function SearchInput({
  selectOptions,
  onSubmitSearch,
  selectValue,
  onChangeSelectValue,
  ...rest
}: Props) {
  const renderOptions = useMemo(
    () =>
      selectOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )),
    [],
  );

  return (
    <StyledForm onSubmit={onSubmitSearch}>
      <select value={selectValue} onChange={onChangeSelectValue}>
        {renderOptions}
      </select>
      <Input {...rest} />
      <button type="submit">
        <SearchIcon />
      </button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  border-radius: 6px;
  box-shadow: ${themedPalette.shadow2};
  overflow: hidden;

  select {
    border: 1px solid ${themedPalette.border3};
    border-radius: 6px 0 0 6px;
    background: ${themedPalette.selectArrowBg};
    margin-right: -1px;
    min-width: 108px;
    height: 36px;
    font-size: 14px;
    font-weight: 500;
    color: ${themedPalette.text2};
    padding: 0 16px;
    outline: none;
  }

  input {
    font-size: 14px;
    height: 36px;
    box-shadow: none;
    border-radius: 0 6px 6px 0;
    padding-right: 36px;

    &:focus {
      box-shadow: none;
    }
  }

  // 아래 버튼안에 svg도 input focus 시에 색상을 바꾸기
  input:focus + button svg {
    color: ${themedPalette.primary1};
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
      color: ${themedPalette.text3};
    }
  }
`;

export default SearchInput;
