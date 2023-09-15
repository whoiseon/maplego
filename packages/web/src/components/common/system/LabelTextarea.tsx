import Textarea, { TextareaProps } from '@/components/common/system/Textarea';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

interface Props extends TextareaProps {
  label: string;
  boxClassName?: string;
}

function LabelTextarea({ label, boxClassName, ...rest }: Props) {
  return (
    <Block className={boxClassName}>
      <label>{label}</label>
      <Textarea {...rest} />
    </Block>
  );
}

const Block = styled.div`
  position: relative;
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

export default LabelTextarea;
