"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  layout?: "full" | "inline";
  variant?: "primary" | "danger" | "text";
  size?: "small" | "medium" | "large";
}

function Button({
  children,
  layout = "inline",
  variant = "primary",
  size = "medium",
  href,
  ...props
}: Props) {
  const baseClass =
    "rounded font-semibold cursor-pointer uppercase leading-none transition transition-all duration-100 ease-in-out";

  const sizeMap = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-2.5 text-sm",
    large: "px-6 py-3 text-base",
  };

  const layoutMap = {
    full: "w-full",
    inline: "inline-block",
  };

  const styleMap = {
    primary: "bg-primary1 text-buttonText hover:bg-primary2",
    danger: "bg-danger1 text-buttonText hover:bg-danger1",
    text: "bg-transparent text-text1 hover:bg-bg_element2",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClass} ${styleMap[variant]} ${layoutMap[layout]} ${sizeMap[size]}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`${baseClass} ${sizeMap[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
