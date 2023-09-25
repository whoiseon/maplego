import MyProfileIcon from '@/assets/images/vectors/my-profile-icon.svg';
import UserProfile from '@/components/common/profile/UserProfile';
import Button from '@/components/common/system/Button';
import LabelInput from '@/components/common/system/LabelInput';
import LabelTextarea from '@/components/common/system/LabelTextarea';
import MeCard from '@/components/desktop/profile/MeCard';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { ChangeEvent, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useGetMyAccount } from '@/lib/hooks/queries/useGetMyAccount';
import { useInput } from '@/lib/hooks/useInput';
import { fetchCheckDisplayName } from '@/lib/api/auth';
import { CheckDisplayName } from '@/components/desktop/auth/SignUpForm';
import { useUpdateProfile } from '@/lib/hooks/queries/useUpdateProfile';
import { ServerMessage } from '@/components/desktop/profile/mePassword/PasswordChangeCard';
import LabelFileInput from '@/components/common/system/LabelFileInput';
import { fetchUploadProfile } from '@/lib/api/upload';

function ProfileEditCard() {
  const { data: meData } = useGetMyAccount();

  const [profileImage, setProfileImage] = useState<string>('');
  const [displayName, onChangeDisplayName] = useInput(
    meData?.displayName || '',
  );
  const [introduction, onChangeIntroduction] = useInput(
    meData?.introduction || '',
  );
  const [checkDisplayName, setCheckDisplayName] = useState<CheckDisplayName>({
    statusCode: 0,
    message: '',
  });
  const [serverMessage, setServerMessage] = useState<ServerMessage>({
    type: 'success',
    message: '',
  });

  const [mutate, isLoading] = useUpdateProfile(setServerMessage);

  const lastLoginRender = useMemo(() => {
    if (!meData?.lastLogin) return '';

    return `마지막 로그인: ${dayjs(meData?.lastLogin).format(
      'YYYY년 MM월 DD일 HH시 mm분',
    )}`;
  }, [meData?.lastLogin]);

  const onEditProfile = () => {
    const isNotChangedProfileImage = meData?.profileImage === profileImage;
    const isNotChangedDisplayName = meData?.displayName === displayName;
    const isNotChangedIntroduction = meData?.introduction === introduction;

    if (
      isNotChangedDisplayName &&
      isNotChangedIntroduction &&
      isNotChangedProfileImage
    ) {
      setServerMessage({
        type: 'error',
        message: '변경된 내용이 없습니다.',
      });
      return;
    }

    mutate({
      profileImage: isNotChangedProfileImage ? '' : profileImage,
      displayName: isNotChangedDisplayName ? '' : displayName,
      introduction: isNotChangedIntroduction ? '' : introduction,
    });
  };

  const onChangeProfileImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file, encodeURIComponent(file.name));
    try {
      const response = await fetchUploadProfile(formData);
      if (response?.statusCode === 200) {
        setProfileImage(response?.payload.path);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onCheckDisplayName = async () => {
    if (
      displayName === '' ||
      displayName.length < 2 ||
      meData?.displayName === displayName
    ) {
      setCheckDisplayName({
        statusCode: 0,
        message: '',
      });
      return;
    }

    try {
      const response = await fetchCheckDisplayName({
        displayName,
      });
      if (response.statusCode === 200) {
        setCheckDisplayName({
          statusCode: response.statusCode,
          message: '사용 가능한 별명입니다.',
        });
      } else {
        setCheckDisplayName({
          statusCode: response.statusCode,
          message: '이미 사용중인 별명입니다.',
        });
      }
    } catch (e) {}
  };

  return (
    <MeCard
      title="프로필 수정"
      icon={<MyProfileIcon />}
      onEdit={onEditProfile}
      message={serverMessage}
    >
      <ProfileBox>
        <LastLoginBox>
          <p>{lastLoginRender}</p>
        </LastLoginBox>
        <ProfileImageBox>
          <UserProfile size={100} thumbnail={profileImage} onlyImage />
          <ActionsBox>
            <p>
              프로필 사진은 <strong>5MB</strong> 이하의 <em>png</em>{' '}
              <em>jpg</em> <em>jpeg</em> <em>gif</em> <em>webp</em> 파일만
              업로드할 수 있어요!
            </p>
            <LabelFileInput
              label="프로필 선택"
              inputId="profile-image-input"
              onChange={onChangeProfileImage}
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
            />
          </ActionsBox>
        </ProfileImageBox>
        <ProfileEditBox>
          <ProfileEditInputGroup>
            <LabelInput
              label="닉네임"
              boxClassName="displayname-input input-item"
              value={displayName}
              onChange={onChangeDisplayName}
              onBlur={onCheckDisplayName}
              innerMessage={checkDisplayName}
              disabled={!!meData?.displayNameChangedAt}
              description={
                meData?.displayNameChangedAt
                  ? '닉네임 변경권이 있다면 언제든지 변경할 수 있어요!'
                  : '처음 한 번은 아이템 없이 변경할 수 있어요!'
              }
            />
            <LabelTextarea
              label="소개"
              boxClassName="introduction-input input-item"
              value={introduction}
              onChange={onChangeIntroduction}
            />
          </ProfileEditInputGroup>
        </ProfileEditBox>
      </ProfileBox>
    </MeCard>
  );
}

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem 0;
  padding: 0 1.5rem 1.5rem;
`;

const ProfileImageBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 1rem;
`;

const ProfileEditBox = styled.div``;

const ProfileEditInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px 0;

  .input-description {
    color: ${themedPalette.warning_text};
    font-weight: 500;
    margin-top: 8px;
  }

  input {
    font-size: 14px;

    &:focus {
      border: 1px solid ${themedPalette.border2};
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
  }

  textarea {
    font-size: 14px;

    &:focus {
      border: 1px solid ${themedPalette.border2};
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;

const ActionsBox = styled.div`
  & > p {
    strong {
      color: ${themedPalette.primary2};
    }

    em {
      font-style: normal;
      padding: 2px 6px 4px;
      border-radius: 4px;
      background: ${themedPalette.bg_page1};
      border: 1px solid ${themedPalette.border3};
      box-shadow: ${themedPalette.shadow2};
    }
  }

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem 0;
`;

const LastLoginBox = styled.div`
  position: absolute;
  top: 28px;
  right: 24px;

  p {
    font-size: 14px;
    color: ${themedPalette.text3};
  }
`;

export default ProfileEditCard;
