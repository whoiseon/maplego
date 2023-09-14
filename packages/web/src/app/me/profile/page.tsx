import MeProfile from '@/components/desktop/profile/MeProfile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메이플고 - 내 프로필',
  description: 'Generated by create next app',
};

function MeProfilePage() {
  return <MeProfile />;
}

export default MeProfilePage;
