import styled from '@emotion/styled';
import Input, { InputProps } from './Input';
import { themedPalette } from '@/styles/palette';

interface Props extends InputProps {
  label: string;
  description?: string;
}

function LabelInput({ label, description, ...rest }: Props) {
  return (
    <Block>
      <label>{label}</label>
      <Input {...rest} />
      {description && <Description>{description}</Description>}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-size: 14px;
    line-height: 1.5;
    color: ${themedPalette.text2};
    font-weight: 700;
    margin-bottom: 4px;
  }
`;

const Description = styled.p`
  color: ${themedPalette.text4};
  font-size: 14px;
  line-height: 1.5;
  margin-top: 4px;
`;

export default LabelInput;
