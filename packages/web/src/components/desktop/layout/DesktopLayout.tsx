"use client";

import { ReactNode } from "react";
import Header from "@/components/desktop/base/Header";
import Footer from "@/components/desktop/base/Footer";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
  theme?: string;
}

function DesktopLayout({ children, theme }: Props) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth/signin" || pathname === "/auth/signup";

  return isAuthPage ? (
    <>{children}</>
  ) : (
    <div className="msin-root">
      <Header theme={theme} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default DesktopLayout;
