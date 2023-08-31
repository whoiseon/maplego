'use client';

import { ReactNode } from 'react';
import Header from '@/components/desktop/base/Header';
import Footer from '@/components/desktop/base/Footer';
import { usePathname } from 'next/navigation';
import styled from '@emotion/styled';
import Aside from '@/components/desktop/base/Aside';
import { themedPalette } from '@/styles/palette';

interface Props {
  children: ReactNode;
  theme?: string;
}

function DesktopLayout({ children, theme }: Props) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth/signin' || pathname === '/auth/signup';

  return isAuthPage ? (
    <>{children}</>
  ) : (
    <RootBlock>
      <Header theme={theme} />
      <AppMain>
        <Container>
          <Aside />
          <RightBox>{children}</RightBox>
        </Container>
      </AppMain>
      <Footer />
    </RootBlock>
  );
}

const RootBlock = styled.div`
  height: auto;
`;

const AppMain = styled.main`
  min-width: 1320px;
  height: auto;
  padding-top: 20px;
  padding-bottom: 60px;
  font-size: 14px;
  background-color: ${themedPalette.bg_page1};
`;

const Container = styled.div`
  display: flex;
  align-content: flex-start;
  gap: 0 20px;
  min-width: 1320px;
  width: 1320px;
  height: 100%;
  padding: 0 1.25rem;
  margin: 0 auto;
`;

const RightBox = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  gap: 20px 0;
`;

export default DesktopLayout;
