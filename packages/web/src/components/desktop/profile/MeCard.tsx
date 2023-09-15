import Card from '@/components/common/system/Card';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { themedPalette } from '@/styles/palette';
import Button from '@/components/common/system/Button';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
  icon?: ReactNode;
  onEdit?: () => void;
  buttonText?: string;
}

function MeCard({
  children,
  title,
  icon,
  onEdit,
  description,
  buttonText = '저장',
}: Props) {
  return (
    <Block>
      <Card>
        {title && (
          <CardHeader>
            <TitleBox>
              {icon}
              <Title>{title}</Title>
            </TitleBox>
            {description && <Description>{description}</Description>}
          </CardHeader>
        )}
        {children}
        {onEdit && (
          <ActionsBox>
            <Button variant="primary" onClick={onEdit}>
              {buttonText}
            </Button>
          </ActionsBox>
        )}
      </Card>
    </Block>
  );
}

const Block = styled.article`
  position: relative;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
  padding: 1.5rem;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;

  svg {
    width: 22px;
    height: 22px;
    color: ${themedPalette.text3};
  }
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
`;

const Description = styled.p`
  color: ${themedPalette.text3};
`;

const ActionsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;
  padding: 0 1.5rem;
  background: ${themedPalette.bg_element3};
  border-top: 1px solid ${themedPalette.border4};

  button {
    height: 36px;
  }
`;

export default MeCard;
