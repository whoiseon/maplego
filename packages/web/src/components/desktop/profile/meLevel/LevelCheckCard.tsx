import MeCard from '@/components/desktop/profile/MeCard';
import styled from '@emotion/styled';
import { useGetMyAccount } from '@/lib/hooks/queries/useGetMyAccount';
import LevelIcon from '@/components/common/user/LevelIcon';
import Link from 'next/link';
import Button from '@/components/common/system/Button';
import { themedPalette } from '@/styles/palette';

interface Props {
  hasLink?: boolean;
  layout?: 'full' | 'half';
}

function LevelCheckCard({ hasLink = true, layout = 'full' }: Props) {
  const { data: meData } = useGetMyAccount();

  if (layout === 'half') {
    return (
      <MeCard>
        <LevelCheckBox>
          <LevelText>
            <span>
              현재 <em>등급</em>
            </span>
          </LevelText>
          <LevelIcon
            className="level-item"
            level={meData!.level}
            hasLevelName
          />
        </LevelCheckBox>
      </MeCard>
    );
  }

  return (
    <MeCard>
      <LevelCheckBox>
        <LevelText>
          <span>
            <strong>{meData?.displayName}님</strong>의 현재 <em>등급</em>
          </span>
        </LevelText>
        <LevelIcon className="level-item" level={1} hasLevelName />
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

  em {
    font-style: normal;
    font-weight: 700;
    color: ${themedPalette.primary2};
  }

  .level-item {
    margin: 0 0.5rem;
  }
`;

export default LevelCheckCard;
