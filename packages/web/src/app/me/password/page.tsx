import { Metadata } from 'next';
import MePassword from '@/components/desktop/profile/mePassword/MePassword';

export const metadata: Metadata = {
  title: '메이플고 - 비밀번호 변경',
  description: 'Generated by create next app',
};

function MeProfilePage() {
  return <MePassword />;
}

export default MeProfilePage;
