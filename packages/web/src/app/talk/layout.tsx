import { ReactNode } from 'react';
import TalkLayout from '@/components/desktop/talk/TalkLayout';

interface Props {
  children: ReactNode;
}

function TalkPageLayout({ children }: Props) {
  return <TalkLayout>{children}</TalkLayout>;
}

export default TalkPageLayout;
