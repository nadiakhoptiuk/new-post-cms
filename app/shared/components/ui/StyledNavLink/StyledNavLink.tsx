import { NavLink } from "react-router";

import type { TStyledNavLink } from "./StyledNavLink.types";
import classes from "./StyledNavLink.module.css";

export const StyledNavLink = ({
  to,
  children,
  variant = "unstyled",
  fullWidth = false,
}: TStyledNavLink) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        if (variant === "gray") {
          return classes.grayLink;
        }

        if (variant === "dangerous") {
          return classes.dangerousLink;
        }

        if (variant === "unstyled") {
          return isActive ? classes.unstyledActiveLink : classes.unstyledLink;
        }

        return isActive ? classes.accentActiveLink : classes.accentLink;
      }}
      style={
        fullWidth
          ? {
              width: "100%",
              textWrap: "nowrap",
            }
          : {
              width: "max-content",
              textWrap: "nowrap",
            }
      }
    >
      {children}
    </NavLink>
  );
};
