'use client';

import React, { Children, MouseEvent, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Portal from './Portal';
import transitions from '@/lib/transitions';
import { themedPalette } from '@/styles/palette';
import { useCallback, useState } from 'react';
import CloseIcon from '@/assets/images/vectors/close-icon.svg';
import useBodyScrollLock from '@/lib/hooks/useBodyScrollLock';
import { media } from '@/lib/media';
import Logo from '../base/Logo';
import Button from './Button';

interface Props {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
  hasCancel?: boolean;
  hasOkAction?: {
    onClick: () => void;
    text: string;
  };
  onToggle: () => void;
}

function Modal({
  icon = (
    <Logo
      type="icon"
      style={{
        width: '1.5rem',
        height: '1.5rem',
      }}
    />
  ),
  title,
  children,
  hasCancel = true,
  hasOkAction,
  onToggle,
}: Props) {
  const [modalClosing, setModalClosing] = useState<boolean>(false);
  const hasActions = hasCancel || !!hasOkAction;
  useBodyScrollLock();

  const onClose = useCallback(() => {
    setModalClosing(true);
    setTimeout(() => {
      onToggle();
    }, 500);
  }, []);

  const onCloseModal = useCallback(
    (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      const isCloseBtn =
        event.target instanceof SVGSVGElement ||
        (event.target as HTMLElement).parentElement?.tagName === 'BUTTON';

      if (isCloseBtn) {
        onClose();
        return;
      }

      if (event.target !== event.currentTarget) return;

      onClose();
    },
    [onClose]
  );

  return (
    <Portal>
      <Overlay
        className={modalClosing ? 'close' : 'open'}
        onClick={onCloseModal}>
        <Container className={modalClosing ? 'close' : 'open'}>
          <Header>
            <Title>
              {icon}
              <h2>{title}</h2>
            </Title>
            <button type="button" onClick={onCloseModal}>
              <CloseIcon />
            </button>
          </Header>
          <Content>{children}</Content>
          {hasActions && (
            <ActionsBox>
              {hasCancel && (
                <Button size="small" variant="text" onClick={onCloseModal}>
                  취소
                </Button>
              )}
              {!!hasOkAction && (
                <Button
                  size="small"
                  variant="primary"
                  onClick={hasOkAction.onClick}>
                  {hasOkAction.text}
                </Button>
              )}
            </ActionsBox>
          )}
        </Container>
      </Overlay>
    </Portal>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  &.close {
    animation: ${transitions.fadeOut} 0.3s ease-in-out forwards;
  }

  &.open {
    animation: ${transitions.fadeIn} 0.3s ease-in-out;
  }

  ${media.mobile} {
    padding: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${themedPalette.bg_element1};
  border-radius: 8px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  min-width: 100%;
  &.close {
    animation: ${transitions.modalClose} 0.3s ease-in-out forwards;
  }

  &.open {
    animation: ${transitions.modalOpen} 0.3s ease-in-out;
  }

  ${media.mobile} {
    min-width: 360px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.25rem 0;

  button {
    background-color: transparent;
    border: none;
    padding: 2px;
    cursor: pointer;
    margin-right: -2px;
    color: ${themedPalette.text4};
    transition: color 0.125s ease-in-out;

    &:hover {
      color: ${themedPalette.text1};
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  h2 {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const Content = styled.div`
  padding: 1.25rem;
  font-size: 0.875rem;
`;

const ActionsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1.25rem;
  height: 3.5rem;
  background: ${themedPalette.bg_page1};
  border-top: 1px solid ${themedPalette.border4};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  button {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export default Modal;
