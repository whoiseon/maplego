import styled from '@emotion/styled';
import NoProfile from '@/components/common/profile/NoProfile';
import { useCallback, useState } from 'react';
import { useGetMyAccount } from '@/lib/hooks/queries/me/useGetMyAccount';
import ProfileToggleListBox from '@/components/common/profile/ProfileToggleListBox';
import useToggle from '@/lib/hooks/useToggle';
import Image from 'next/image';
import { themedPalette } from '@/styles/palette';

interface Props {
  size?: number;
  onlyImage?: boolean;
  thumbnail?: string;
}

function UserProfile({ size = 38, onlyImage = false, thumbnail }: Props) {
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

  if (thumbnail) {
    return (
      <OnlyImageBlock size={size}>
        <img
          className="profile-image"
          src={thumbnail}
          alt={thumbnail}
          width={size}
          height={size}
        />
      </OnlyImageBlock>
    );
  }

  if (onlyImage) {
    return (
      <OnlyImageBlock size={size}>
        {!meData?.profileImage ? (
          <NoProfile size={size} onlyImage={onlyImage} />
        ) : (
          <img
            className="profile-image"
            src={meData.profileImage}
            alt={meData.profileImage}
            width={size}
            height={size}
          />
        )}
      </OnlyImageBlock>
    );
  }

  return (
    <ProfileBox size={size} onClick={openList ? undefined : onToggle}>
      {!meData?.profileImage ? (
        <NoProfile size={size} />
      ) : (
        <img
          className="profile-image"
          src={meData.profileImage}
          alt={meData.profileImage}
          width={size}
          height={size}
        />
      )}
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
  outline: 1px solid transparent;
  border: 1px solid transparent;
  transition: outline 0.2s ease-in-out;
  cursor: pointer;

  img.profile-image {
    border-radius: 50%;
    object-fit: cover;
    transition: outline 0.2s ease-in-out;

    &:hover {
      outline: 1px solid ${themedPalette.primary2};
    }
  }
`;

const OnlyImageBlock = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size + 4}px;
  height: ${({ size }) => size + 4}px;

  img.profile-image {
    border-radius: 50%;
    box-shadow: ${themedPalette.shadow2};
    object-fit: cover;
  }
`;

export default UserProfile;
