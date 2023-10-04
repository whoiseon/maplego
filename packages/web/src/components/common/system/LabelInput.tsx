import styled from '@emotion/styled';
import Input, { InputProps } from './Input';
import { themedPalette } from '@/styles/palette';
import { memo } from 'react';
import { CheckDisplayName } from '@/components/desktop/auth/SignUpForm';
import transitions from '@/lib/transitions';
import Button from '@/components/common/system/Button';

interface Props extends InputProps {
  label: string;
  description?: string;
  boxClassName?: string;
  innerMessage?: CheckDisplayName;
  onClick?: () => void;
  buttonText?: string;
  isLoading?: boolean;
}

function LabelInput({
  label,
  description,
  boxClassName,
  innerMessage,
  onClick,
  buttonText,
  isLoading,
  ...rest
}: Props) {
  return (
    <Block className={boxClassName}>
      <label>{label}</label>
      {onClick ? (
        <WithButton>
          <Input {...rest} />
          <Button
            type="button"
            onClick={onClick}
            disabled={rest.disabled}
            isLoading={isLoading}
          >
            {buttonText ? buttonText : '버튼'}
          </Button>
        </WithButton>
      ) : (
        <Input {...rest} />
      )}
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

const WithButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;
  button {
    white-space: nowrap;
    min-width: 62px;
  }
`;

export default memo(LabelInput);
