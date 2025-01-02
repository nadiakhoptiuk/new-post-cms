import { Link } from "react-router";

import type { TStyledLink } from "./StyledLink.types";

import s from "./StyledLink.module.css";

export const StyledLink = ({
  children,
  variant = "unstyled",
  ...rest
}: TStyledLink) => {
  return (
    <Link
      className={variant === "accent" ? s.accentLink : s.unstyledLink}
      {...rest}
    >
      {children}
    </Link>
  );
};
