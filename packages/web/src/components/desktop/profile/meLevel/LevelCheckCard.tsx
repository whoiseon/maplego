import MeCard from '@/components/desktop/profile/MeCard';
import styled from '@emotion/styled';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import LevelIcon from '@/components/common/user/LevelIcon';
import Link from 'next/link';
import Button from '@/components/common/system/Button';

interface Props {
  hasLink?: boolean;
}

function LevelCheckCard({ hasLink = true }: Props) {
  const { data: meData } = useGetMyAccount();
  return (
    <MeCard>
      <LevelCheckBox>
        <LevelText>
          <span>
            <strong>{meData?.displayName}님</strong>의 현재 등급은
          </span>
          <span>
            <LevelIcon className="level-item" level={1} hasLevelName />
          </span>
          <span>입니다!</span>
        </LevelText>
        {hasLink && (
          <Button href="/me/level" size="small" variant="gray">
            진급하러 가기
          </Button>
        )}
      </LevelCheckBox>
    </MeCard>
  );
}

const LevelCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`;

const LevelText = styled.p`
  display: flex;
  align-items: center;

  strong {
    font-weight: 700;
  }

  .level-item {
    margin: 0 0.5rem;
  }
`;

export default LevelCheckCard;
