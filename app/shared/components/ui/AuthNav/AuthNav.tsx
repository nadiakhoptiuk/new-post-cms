import { List, ListItem } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { StyledNavLink } from "../StyledNavLink";

import { AuthNavLinks } from "~/shared/constants/navigation";
import type { TAuthNav } from "./AuthNav.types";

export const AuthNav = ({ burgerMenu = false }: TAuthNav) => {
  const { t } = useTranslation(["common", "auth"]);

  const items = AuthNavLinks.map(({ id, link }) => (
    <ListItem
      key={id}
      styles={{
        itemWrapper: { width: "100%" },
        itemLabel: { width: "100%" },
        item: { flexWrap: "nowrap" },
      }}
    >
      <StyledNavLink to={link} fullWidth>
        {t(id)}
      </StyledNavLink>
    </ListItem>
  ));

  return (
    <List
      display='flex'
      styles={{
        root: {
          alignItems: burgerMenu ? "flex-start" : "center",
          justifyContent: "flex-start",
          flexDirection: burgerMenu ? "column" : "row",
          columnGap: 10,
          rowGap: 10,
        },
        item: { width: "100%" },
      }}
    >
      {items}
    </List>
  );
};
