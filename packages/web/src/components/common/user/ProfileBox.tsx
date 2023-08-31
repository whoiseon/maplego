import styled from '@emotion/styled';
import { ReactNode } from 'react';
import LevelIcon from '@/components/common/user/LevelIcon';

interface Props {
  displayName: string;
  level: number;
}

function ProfileBox({ displayName, level }: Props) {
  return (
    <StyledProfile>
      <LevelIcon level={level} />
      <DisplayName>{displayName}</DisplayName>
    </StyledProfile>
  );
}

const StyledProfile = styled.button`
  display: initial;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 600;
  padding: 0;
  cursor: pointer;
`;

const DisplayName = styled.span`
  margin-left: 6px;
`;

export default ProfileBox;
