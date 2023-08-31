import ServerIcon from '@/components/common/maple/ServerIcon';
import styled from '@emotion/styled';
import { useState } from 'react';
import { themedPalette } from '@/styles/palette';
import transitions from '@/lib/transitions';

interface Props {
  onClick?: () => void;
  code: number;
  name: string;
}

function QuickServerButton({ onClick, code, name }: Props) {
  const [onHover, setOnHover] = useState<boolean>(false);
  const [nameClosing, setNameClosing] = useState<boolean>(false);

  const onEnter = () => {
    setOnHover(true);
    setNameClosing(false);
  };

  const onLeave = () => {
    setNameClosing(true);
    setTimeout(() => {
      setOnHover(false);
    }, 200);
  };

  return (
    <StyledButton key={code} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <ServerIcon code={code} />
      {onHover && (
        <ServerName className={nameClosing ? 'close' : 'open'}>
          {name}
        </ServerName>
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  background: ${themedPalette.bg_element1};
  border: 1px solid ${themedPalette.bg_element1};
  border-radius: 4px;
  box-shadow: ${themedPalette.shadow2};
  cursor: pointer;
  transition: all 0.125s ease-in-out;

  &:hover {
    border: 1px solid ${themedPalette.border3};
  }

  &:active {
    background: ${themedPalette.bg_element3};
  }
`;

const ServerName = styled.div`
  position: absolute;
  top: 6px;
  left: -66px;
  width: 56px;
  padding: 4px 0;
  background: ${themedPalette.bg_element5};
  color: ${themedPalette.text6};
  border-radius: 4px;
  box-shadow: ${themedPalette.shadow2};
  font-size: 12px;
  font-weight: 700;

  &.close {
    animation: ${transitions.rightToLeftScaleSlide} 0.2s ease-in-out forwards;
  }

  &.open {
    animation: ${transitions.leftToRightScaleSlide} 0.2s ease-in-out;
  }
`;

export default QuickServerButton;
