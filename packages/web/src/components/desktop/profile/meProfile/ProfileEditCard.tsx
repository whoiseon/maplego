import MyProfileIcon from '@/assets/images/vectors/my-profile-icon.svg';
import UserProfile from '@/components/common/profile/UserProfile';
import Button from '@/components/common/system/Button';
import LabelInput from '@/components/common/system/LabelInput';
import LabelTextarea from '@/components/common/system/LabelTextarea';
import MeCard from '@/components/desktop/profile/MeCard';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import { useInput } from '@/lib/hooks/useInput';

function ProfileEditCard() {
  const { data: meData } = useGetMyAccount();

  const [displayName, onChangeDisplayName] = useInput(
    meData?.displayName || '',
  );
  const [introduction, onChangeIntroduction] = useInput(
    meData?.introduction || '',
  );

  const lastLoginRender = useMemo(() => {
    if (!meData?.lastLogin) return '';

    return `마지막 로그인: ${dayjs(meData?.lastLogin).format(
      'YYYY년 MM월 DD일 HH시 mm분',
    )}`;
  }, [meData?.lastLogin]);

  const onEidtProfile = () => {
    const isNotChangedDisplayName = meData?.displayName === displayName;
    const isNotChangedIntroduction = meData?.introduction === introduction;

    console.log({
      displayName: isNotChangedDisplayName ? null : displayName,
      introduction: isNotChangedIntroduction ? null : introduction,
    });
  };

  return (
    <MeCard title="프로필 수정" icon={<MyProfileIcon />} onEdit={onEidtProfile}>
      <ProfileBox>
        <LastLoginBox>
          <p>{lastLoginRender}</p>
        </LastLoginBox>
        <ProfileImageBox>
          <UserProfile size={100} onlyImage />
          <ActionsBox>
            <p>
              프로필 사진은 <strong>5MB</strong> 이하의 이미지 파일만 업로드할
              수 있어요!
            </p>
            <Button variant="gray" size="small">
              프로필 사진 변경
            </Button>
          </ActionsBox>
        </ProfileImageBox>
        <ProfileEditBox>
          <ProfileEditInputGroup>
            <LabelInput
              label="닉네임"
              boxClassName="input-item"
              value={displayName}
              onChange={onChangeDisplayName}
            />
            <LabelTextarea
              label="소개"
              boxClassName="input-item"
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

  .input-item {
    gap: 6px 0;
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
