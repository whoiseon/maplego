import Providers from '@/components/common/system/Providers';
import Footer from '@/components/desktop/base/Footer';
import Header from '@/components/desktop/base/Header';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'MSIN',
  description: 'Generated by create next app',
};

function GetThemeInCookie() {
  const nextCookies = cookies();
  return nextCookies.get('theme')?.value;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentTheme = GetThemeInCookie();
  return (
    <html
      lang="ko"
      className={currentTheme}
      style={{
        colorScheme: currentTheme,
      }}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
