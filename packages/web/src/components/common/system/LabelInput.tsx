import styled from '@emotion/styled';
import Input, { InputProps } from './Input';
import { themedPalette } from '@/styles/palette';
import { memo } from 'react';
import { CheckDisplayName } from '@/components/desktop/auth/SignUpForm';
import transitions from '@/lib/transitions';

interface Props extends InputProps {
  label: string;
  description?: string;
  boxClassName?: string;
  innerMessage?: CheckDisplayName;
}

function LabelInput({
  label,
  description,
  boxClassName,
  innerMessage,
  ...rest
}: Props) {
  return (
    <Block className={boxClassName}>
      <label>{label}</label>
      <Input {...rest} />
      {description && (
        <Description className="input-description">{description}</Description>
      )}
      {innerMessage && (
        <InnerMessage statusCode={innerMessage.statusCode}>
          {innerMessage.message}
        </InnerMessage>
      )}
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

const Description = styled.p`
  color: ${themedPalette.text4};
  font-size: 14px;
  line-height: 1.5;
  margin-top: 4px;
`;

const InnerMessage = styled.p<{ statusCode: number }>`
  position: absolute;
  top: 40px;
  right: 16px;
  font-size: 12px;
  animation: ${transitions.errorBounce} 0.3s ease-in-out;
  color: ${({ statusCode }) =>
    statusCode === 200 ? themedPalette.success_text : themedPalette.danger2};
`;

export default memo(LabelInput);
