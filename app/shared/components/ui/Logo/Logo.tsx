import { Link } from "react-router";
import { Text, ThemeIcon } from "@mantine/core";
import { IconFloatNone } from "@tabler/icons-react";

import { NavigationLink } from "~/shared/constants/navigation";

import type { TLogo } from "./Logo.types";

import s from "./Logo.module.css";

export const Logo = ({ accent = true, link }: TLogo) => {
  return (
    <Link to={link || NavigationLink.HOME} className={s.logoLink}>
      <ThemeIcon
        variant='gradient'
        size='lg'
        aria-label='Gradient action icon'
        gradient={
          accent
            ? { from: "blue", to: "cyan", deg: 245 }
            : { from: "gray", to: "white", deg: 90 }
        }
      >
        <IconFloatNone
          size={28}
          style={{ color: accent ? "white" : "white" }}
        />
      </ThemeIcon>

      <Text component='span' size='xl' fw={900} c='blue'>
        POST CMS
      </Text>
    </Link>
  );
};
