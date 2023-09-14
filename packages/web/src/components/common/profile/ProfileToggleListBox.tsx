import Card from '@/components/common/system/Card';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import transitions from '@/lib/transitions';
import Link from 'next/link';
import LevelIcon from '@/components/common/user/LevelIcon';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import React, { useRef, useEffect } from 'react';
import LogoutIcon from '@/assets/images/vectors/logout-icon.svg';
import ThemeIcon from '@/assets/images/vectors/profile-theme-icon.svg';
import { useSignOut } from '@/lib/hooks/useSignOut';
import ThemeButton from '@/components/common/system/ThemeButton';

interface Props {
  modalClosing: boolean;
  onClose: () => void;
}

function ProfileToggleListBox({ modalClosing, onClose }: Props) {
  const { data: meData } = useGetMyAccount();
  const ModalRef = useRef<any>(null);
  const [onSignOutMutation] = useSignOut();

  const onSignOut = () => {
    onSignOutMutation();
  };

  const onCloseModal = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (ModalRef.current && !ModalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', onCloseModal);

    return () => {
      document.removeEventListener('click', onCloseModal);
    };
  }, [ModalRef]);

  return (
    <StyledListBox className={modalClosing ? 'close' : 'open'} ref={ModalRef}>
      <Card>
        <ListItem>
          <Link href="/accounts/info">
            <div className="item-icon">
              <LevelIcon level={1} />
            </div>
            <div className="item-text">
              <p>{meData?.displayName}</p>
              <p className="sub-text">마이페이지</p>
            </div>
          </Link>
        </ListItem>
        <ListItem>
          <div className="theme-item">
            <div className="left-box">
              <div className="item-icon center">
                <ThemeIcon />
              </div>
              <div className="item-text">
                <p>테마</p>
              </div>
            </div>
            <div className="right-box">
              <ThemeButton />
            </div>
          </div>
        </ListItem>
        <ListItem>
          <button type="button" className="center logout" onClick={onSignOut}>
            <div className="item-icon center">
              <LogoutIcon />
            </div>
            <div className="item-text">
              <p>로그아웃</p>
            </div>
          </button>
        </ListItem>
      </Card>
    </StyledListBox>
  );
}

const StyledListBox = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 280px;
  border-radius: 4px;
  z-index: 999;

  & > div {
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid ${themedPalette.border4};
  }

  &.close {
    animation: ${transitions.modalCloseToTop} 0.2s ease-in-out forwards;
  }

  &.open {
    animation: ${transitions.modalOpenFromTop} 0.2s ease-in-out;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${themedPalette.border4};

  .theme-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: initial;
    padding: 6px 16px;

    .left-box {
      display: flex;
      align-items: center;
      font-size: 14px;
      gap: 0.625rem;

      .item-icon.center {
        display: flex;
        align-items: center;
      }
    }

    .right-box {
      button {
        margin: 0;

        svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  & > button,
  & > a {
    display: flex;
    align-items: flex-start;
    gap: 0.625rem;
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    background: ${themedPalette.bg_element1};
    transition: background 0.125s ease-in-out;
    font-weight: 600;
    color: ${themedPalette.text1};

    &.center {
      align-items: center;
    }

    .item-icon.center {
      display: flex;
      align-items: center;
    }

    &.logout {
      color: ${themedPalette.danger2};

      svg {
        color: ${themedPalette.danger2};
      }
    }
  }

  a {
    &:hover {
      background: ${themedPalette.bg_element3};
    }

    & > div {
      display: flex;
      flex-direction: column;
      gap: 4px 0;
    }

    .item-text {
      p.sub-text {
        font-size: 12px;
        font-weight: 500;
        color: ${themedPalette.text3};
      }
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      background: ${themedPalette.bg_element3};
    }
  }

  .item-icon {
    svg {
      width: 20px;
      height: 20px;
      color: ${themedPalette.text2};
    }
  }

  &:first-of-type {
    border-top: none;
  }
`;

export default ProfileToggleListBox;
