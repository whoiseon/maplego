import { Metadata } from 'next';
import MeMp from '@/components/desktop/profile/meMp/meMp';
import HydrateMeMp from '@/components/desktop/hydrate/HydrateMeMp';

export const metadata: Metadata = {
  title: '메이플고 - 내 포인트',
  description: 'Generated by create next app',
};

function MeMpPage() {
  return <HydrateMeMp />;
}

export default MeMpPage;
