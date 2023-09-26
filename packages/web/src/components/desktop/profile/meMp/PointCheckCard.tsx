import MeCard from '@/components/desktop/profile/MeCard';
import styled from '@emotion/styled';
import { useGetMyAccount } from '@/lib/hooks/queries/me/useGetMyAccount';
import { themedPalette } from '@/styles/palette';
import PointIcon from '@/components/common/system/PointIcon';
import Link from 'next/link';

interface Props {
  hasLink?: boolean;
  layout?: 'full' | 'half';
}

function PointCheckCard({ hasLink = true, layout = 'full' }: Props) {
  const { data: meData } = useGetMyAccount();

  if (layout === 'half') {
    return (
      <MeCard>
        <PointCheckBox>
          <PointText>
            <span>
              보유 중인 <em>포인트</em>
            </span>
          </PointText>
          <PointValueLinkBox href="/me/mp" layout={layout}>
            <PointIcon />
            <span>{meData!.mp.toLocaleString()}</span>
          </PointValueLinkBox>
        </PointCheckBox>
      </MeCard>
    );
  }

  return (
    <MeCard>
      <PointCheckBox>
        <PointText>
          <span>
            <strong>{meData?.displayName}님</strong>이 보유 중인{' '}
            <em>메이플고 포인트</em>
          </span>
        </PointText>
        <PointValueBox layout={layout}>
          <PointIcon />
          <span>{meData!.mp?.toLocaleString()}</span>
        </PointValueBox>
      </PointCheckBox>
    </MeCard>
  );
}

const PointCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`;

const PointText = styled.p`
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

const PointValueLinkBox = styled(Link)<{ layout: 'full' | 'half' }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  min-width: ${({ layout }) => (layout === 'full' ? '240px' : '160px')};
  gap: 0 6px;
  padding: ${({ layout }) => (layout === 'full' ? '10px' : '8px')} 12px;
  border-radius: 4px;
  background: ${themedPalette.bg_page1};
  border: 1px solid ${themedPalette.border3};
  box-shadow: ${themedPalette.shadow2};
  color: ${themedPalette.text1};

  span {
    font-weight: 600;
  }
`;

const PointValueBox = styled.div<{ layout: 'full' | 'half' }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  min-width: ${({ layout }) => (layout === 'full' ? '240px' : '160px')};
  gap: 0 6px;
  padding: ${({ layout }) => (layout === 'full' ? '10px' : '8px')} 12px;
  border-radius: 4px;
  background: ${themedPalette.bg_page1};
  border: 1px solid ${themedPalette.border3};
  box-shadow: ${themedPalette.shadow2};
  color: ${themedPalette.text1};

  span {
    font-weight: 700;
  }
`;

export default PointCheckCard;
