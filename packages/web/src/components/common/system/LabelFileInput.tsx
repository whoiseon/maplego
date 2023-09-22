import styled from '@emotion/styled';
import Input, { InputProps } from '@/components/common/system/Input';
import { themedPalette } from '@/styles/palette';

interface Props extends InputProps {
  label: string;
  inputId: string;
}

function LabelFileInput({ label, inputId, ...rest }: Props) {
  return (
    <Block>
      <label htmlFor={inputId}>{label}</label>
      <Input type="file" inputId={inputId} {...rest} />
    </Block>
  );
}

const Block = styled.div`
  label {
    display: inline-flex;
    align-items: center;
    gap: 0 6px;
    padding: 8px 12px;
    border-radius: 4px;
    background: ${themedPalette.bg_page1};
    border: 1px solid ${themedPalette.border3};
    box-shadow: ${themedPalette.shadow2};
    cursor: pointer;
    transition: all 0.125s ease-in-out;

    &:hover {
      border: 1px solid ${themedPalette.border2};
    }
  }
`;

export default LabelFileInput;
