"use client";

import MsInLogo from "@/assets/images/vectors/msin-logo.svg";
import MsInLogoDark from "@/assets/images/vectors/msin-logo-dark.svg";
import MsInLogoIcon from "@/assets/images/vectors/msin-logo-icon.svg";
import MsInLogoIconDark from "@/assets/images/vectors/msin-logo-icon-dark.svg";
import { useTheme } from "next-themes";
import { memo, useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  theme?: string;
  type?: "text" | "icon";
}

function Logo({ theme, type = "text" }: Props) {
  const [firstMounted, setFirstMounted] = useState(true);
  const loadedTheme = theme || "light";
  const { theme: currentTheme } = useTheme();

  const onReloadWindow = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    setFirstMounted(false);
  }, []);

  if (firstMounted) {
    return type === "text" ? (
      loadedTheme === "dark" ? (
        <MsInLogoDark />
      ) : (
        <MsInLogo />
      )
    ) : loadedTheme === "dark" ? (
      <MsInLogoIconDark />
    ) : (
      <MsInLogoIcon />
    );
  }

  return (
    <Link href="/" onClick={onReloadWindow}>
      {type === "text" ? (
        loadedTheme === "dark" ? (
          <MsInLogoDark />
        ) : (
          <MsInLogo />
        )
      ) : loadedTheme === "dark" ? (
        <MsInLogoIconDark />
      ) : (
        <MsInLogoIcon />
      )}
    </Link>
  );
}

export default memo(Logo);
