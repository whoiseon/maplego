"use client";

import Link from "next/link";
import { ReactNode } from "react";
import tw, { styled } from "twin.macro";

interface Props {
  children: ReactNode;
  href?: string;
  layout?: "full" | "inline";
  variant?: "primary" | "danger" | "text";
  size?: "small" | "medium" | "large";
}

const baseClass =
  "flex items-center justify-center rounded font-semibold cursor-pointer uppercase leading-none transition";

const sizeMap = {
  small: "px-3 h-[36px] text-sm",
  medium: "px-4 h-[42px] text-base",
  large: "px-6 h-[48px] text-base",
};

const layoutMap = {
  full: "w-full",
  inline: "inline-block",
};

const styleMap = {
  primary: "bg-primary1 text-buttonText hover:bg-primary2 active:bg-primary3",
  danger: "bg-danger1 text-buttonText hover:bg-danger2 active:bg-danger3",
  text: "bg-transparent text-text1 hover:bg-bg_element2 active:bg-bg_element3",
};

function Button({
  children,
  layout = "inline",
  variant = "primary",
  size = "medium",
  href,
  ...props
}: Props) {
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
      className={`${baseClass} ${styleMap[variant]} ${layoutMap[layout]} ${sizeMap[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
