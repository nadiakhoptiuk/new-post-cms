import { LinkProps } from "react-router";

export interface TStyledLink extends LinkProps {
  children: React.ReactNode;
  variant?: "accent" | "unstyled";
}
