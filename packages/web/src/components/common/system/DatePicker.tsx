import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { css } from '@emotion/react';

registerLocale('ko', ko);

interface Props {
  dateState: Date;
  onChange: (date: Date) => void;
  position?: 'center' | 'left' | 'right';
}

function DatePicker({ dateState, onChange, position = 'center' }: Props) {
  return (
    <Block position={position}>
      <ReactDatePicker
        selected={dateState}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
      />
    </Block>
  );
}

const Block = styled.div<{ position: 'center' | 'left' | 'right' }>`
  display: flex;
  align-items: center;
  box-shadow: ${themedPalette.shadow2};

  input {
    background: ${themedPalette.bg_page1};
    border: 1px solid ${themedPalette.border3};
    border-radius: 4px;
    height: 36px;
    padding: 0 12px;
    outline: none;
    width: 150px;
    cursor: pointer;
    transition: border 0.2s ease-in-out;

    &:focus {
      border: 1px solid ${themedPalette.border2};
    }

    ${({ position }) =>
      position === 'left' &&
      css`
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 1px solid transparent;
      `}

    ${({ position }) =>
      position === 'right' &&
      css`
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      `}
  }
`;

export default DatePicker;
