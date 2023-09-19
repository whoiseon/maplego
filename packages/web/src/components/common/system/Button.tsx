import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { themedPalette } from '@/styles/palette';
import Spinner from '@/components/common/system/Spinner';

type Variant = 'primary' | 'danger' | 'gray' | 'dark' | 'text';

interface ButtonProps {
  layout?: 'inline' | 'fullWidth';
  size?: 'small' | 'medium';
  variant?: Variant;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  to?: string;
  href?: string;
  isLoading?: boolean;
}

function Button({
  layout = 'inline',
  size = 'medium',
  variant = 'primary',
  href,
  icon,
  isLoading = false,
  ...rest
}: Props) {
  if (href) {
    return (
      <StyledLink
        className={rest.className}
        layout={layout}
        variant={variant}
        size={size}
        href={href}
        style={rest.style}
      >
        {icon}
        {isLoading ? <Spinner /> : rest.children}
      </StyledLink>
    );
  }
  return (
    <StyledButton layout={layout} variant={variant} size={size} {...rest}>
      {icon}
      {isLoading ? <Spinner /> : rest.children}
    </StyledButton>
  );
}

const variantStyles = {
  primary: css`
    background: ${themedPalette.primary2};
    color: ${themedPalette.button_text1};
    font-weight: 700;
    box-shadow: ${themedPalette.shadow2};
    border: 1.6px solid ${themedPalette.button_border1};

    &:hover {
      opacity: 0.875;
    }
    &:active {
      background: ${themedPalette.primary3};
    }
  `,
  danger: css`
    background: ${themedPalette.danger1};
    color: ${themedPalette.button_text1};
    font-weight: 700;
    box-shadow: ${themedPalette.shadow2};
    border: 1.6px solid ${themedPalette.button_border1};

    &:hover {
      opacity: 0.875;
    }
    &:active {
      background: ${themedPalette.danger2};
    }
  `,
  gray: css`
    background: ${themedPalette.bg_page1};
    color: ${themedPalette.button_text2};
    border: 1px solid ${themedPalette.border3};
    box-shadow: ${themedPalette.shadow2};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      border: 1px solid ${themedPalette.border2};
    }

    &:active {
      background: ${themedPalette.bg_element3};
    }
  `,
  dark: css`
    background: ${themedPalette.bg_element6};
    color: ${themedPalette.button_text1};
    border: 1px solid ${themedPalette.border1};
    box-shadow: ${themedPalette.shadow2};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      border: 1px solid ${themedPalette.border1};
    }
    &:active {
      background: ${themedPalette.bg_element3};
    }
  `,
  text: css`
    background-color: transparent;
    color: ${themedPalette.button_text2};
    text-decoration: none;
    font-weight: 600;
    border: 1px solid transparent;
    &:hover {
      background-color: ${themedPalette.bg_element2};
      color: ${themedPalette.text1};
    }
  `,
};

const sizeStyles = {
  small: css`
    height: 34px;
    font-size: 14px;
    padding-left: 12px;
    padding-right: 12px;
  `,
  medium: css`
    height: 42px;
    font-size: 16px;
    padding-left: 16px;
    padding-right: 16px;
  `,
};

const sharedStyles = (props: ButtonProps) => css`
  position: relative;
  display: flex;
  ${sizeStyles[props.size!]};
  ${variantStyles[props.variant!]!};
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.16s ease-in-out;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  &:disabled {
    filter: grayscale(0.6);
    opacity: 0.3;
  }

  ${props.layout === 'fullWidth' &&
  css`
    width: 100%;
  `}
`;

const StyledButton = styled.button<ButtonProps>`
  ${(props) => sharedStyles(props)}
`;

const StyledLink = styled(Link)<ButtonProps>`
  ${(props) => sharedStyles(props)}
`;

export default Button;
