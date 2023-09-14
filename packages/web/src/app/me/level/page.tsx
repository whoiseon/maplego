import { Metadata } from 'next';
import MeLevel from '@/components/desktop/profile/MeLevel';

export const metadata: Metadata = {
  title: '메이플고 - 내 등급',
  description: 'Generated by create next app',
};

function MeProfilePage() {
  return <MeLevel />;
}

export default MeProfilePage;