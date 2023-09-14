import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import NoProfile from '@/components/common/profile/NoProfile';
import { useCallback, useState } from 'react';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import Link from 'next/link';
import Card from '@/components/common/system/Card';
import ProfileToggleListBox from '@/components/common/profile/ProfileToggleListBox';
import useToggle from '@/lib/hooks/useToggle';

interface Props {
  size?: number;
  onlyImage?: boolean;
}

function UserProfile({ size = 38, onlyImage = false }: Props) {
  const { data: meData } = useGetMyAccount();

  const [openList, onOpen] = useToggle(false);
  const [modalClosing, setModalClosing] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setModalClosing(true);
    setTimeout(() => {
      onOpen();
      setModalClosing(false);
    }, 300);
  }, [onOpen]);

  const onToggle = useCallback(() => {
    if (openList) {
      onClose();
      return;
    }
    onOpen();
  }, [openList]);

  if (onlyImage) {
    return (
      <OnlyImageBlock>
        {!meData?.profileImage ? <NoProfile size={size} /> : '프로필'}
      </OnlyImageBlock>
    );
  }

  return (
    <ProfileBox size={size} onClick={openList ? undefined : onToggle}>
      {!meData?.profileImage ? <NoProfile size={size} /> : '프로필'}
      {openList && (
        <ProfileToggleListBox modalClosing={modalClosing} onClose={onClose} />
      )}
    </ProfileBox>
  );
}

const ProfileBox = styled.div<{ size: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size + 4}px;
  height: ${({ size }) => size + 4}px;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: border 0.2s ease-in-out;
  cursor: pointer;
`;

const OnlyImageBlock = styled.div``;

export default UserProfile;
