import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import BottomArrowIcon from '@/assets/images/vectors/bottom-arrow.svg';
import Image from 'next/image';
import useToggle from '@/lib/hooks/useToggle';
import Portal from '@/components/common/system/Portal';
import ServerListBox from '@/components/common/chat/ServerListBox';
import { useCallback, useState } from 'react';
import ServerIcon from '@/components/common/maple/ServerIcon';

function ServerSelectBox() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [open, onOpen] = useToggle(false);
  const [modalClosing, setModalClosing] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setModalClosing(true);
    setTimeout(() => {
      onOpen();
      setModalClosing(false);
    }, 300);
  }, [onOpen]);

  const onToggle = useCallback(() => {
    if (open) {
      onClose();
      setClicked(false);
      return;
    }
    onOpen();
    setClicked(true);
  }, [open]);

  return (
    <StyledSelectBox>
      <SelectBox onClick={onToggle} isOpen={clicked}>
        <ServerBox>
          <ServerIcon code={1} />
          <ServerName>전체월드</ServerName>
        </ServerBox>
        <BottomArrowIcon />
      </SelectBox>
      {open && <ServerListBox onToggle={onClose} modalClosing={modalClosing} />}
    </StyledSelectBox>
  );
}

const StyledSelectBox = styled.div`
  position: relative;
`;

const ServerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;
`;

const SelectBox = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  border-radius: 4px;
  border: ${({ isOpen }) =>
    isOpen
      ? `1px solid ${themedPalette.primary1}`
      : `1px solid ${themedPalette.border3}`};
  min-width: 140px;
  cursor: pointer;
  transition: all 0.125s ease-in-out;
  background: ${themedPalette.bg_page1};
  box-shadow: ${themedPalette.shadow2};

  &:hover {
    border: ${({ isOpen }) =>
      isOpen
        ? `1px solid ${themedPalette.primary1}`
        : `1px solid ${themedPalette.border2}`};
  }

  svg {
    width: 1.25rem;
    color: ${themedPalette.text3};
    transform: rotate(0deg);
    transition: all 0.125s ease-in-out;

    ${({ isOpen }) =>
      isOpen &&
      `
        transform: rotate(180deg);
        color: ${themedPalette.primary1};
      `}
  }
`;

const ServerName = styled.span`
  color: ${themedPalette.text1};
  font-weight: 600;
`;

export default ServerSelectBox;
