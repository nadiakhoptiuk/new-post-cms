import type { NavLinkProps } from "react-router";

export type TStyledNavLink = {
  children: React.ReactNode;
  variant?: "accent" | "unstyled" | "gray" | "dangerous";
  insideBox?: boolean;
  fullWidth?: boolean;
} & NavLinkProps;
