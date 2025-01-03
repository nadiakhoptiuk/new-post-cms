import { useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Box, Collapse, Group, List, UnstyledButton } from "@mantine/core";
import { IconChevronRight, type TablerIcon } from "@tabler/icons-react";

import { StyledNavLink } from "../../ui/StyledNavLink";

import type { TDashboardNavLink } from "./NavBarLinksGroup.types";

import s from "./NavBarLinksGroup.module.css";

export function LinksGroup({ links, link, icon, id }: TDashboardNavLink) {
  const hasLinks = Array.isArray(links);
  const location = useLocation();
  const Icon = icon || undefined;

  const shouldOpenDropdown = () => {
    if (!links) {
      return false;
    }

    const chidPaths = links.map(({ link }) => link);
    return chidPaths.some((el) => el === location.pathname);
  };

  const [opened, setOpened] = useState(shouldOpenDropdown());
  const { t } = useTranslation("dashboard");

  const items = (hasLinks ? links : []).map(({ id, link, icon }) => {
    const Icon: TablerIcon = icon || undefined;

    return (
      <List.Item
        key={id}
        w='100%'
        styles={{
          itemWrapper: { width: "100%" },
          itemLabel: { width: "100%" },
        }}
      >
        <StyledNavLink fullWidth to={link}>
          <Icon />
          <span>{t(`dashboardLinks.${id}`)}</span>
        </StyledNavLink>
      </List.Item>
    );
  });

  return (
    <>
      {hasLinks && (
        <UnstyledButton
          mt='xs'
          c='dark'
          onClick={() => setOpened((o) => !o)}
          className={s.button}
        >
          <Group justify='space-between' gap={0}>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "10px",
              }}
            >
              {Icon && <Icon size={22} />}
              <Box>{t(`dashboardLinks.${id}`)}</Box>
            </Box>

            {hasLinks && (
              <IconChevronRight
                className={s.chevron}
                stroke={1.5}
                size={16}
                style={{ transform: opened ? "rotate(-90deg)" : "none" }}
              />
            )}
          </Group>
        </UnstyledButton>
      )}

      {!hasLinks && link && (
        <List.Item
          w='100%'
          styles={{
            itemWrapper: { width: "100%" },
            itemLabel: { width: "100%" },
          }}
        >
          <StyledNavLink fullWidth to={link}>
            {Icon && <Icon size={22} />}
            <span>{t(`dashboardLinks.${id}`)}</span>
          </StyledNavLink>
        </List.Item>
      )}

      {hasLinks ? (
        <Collapse pl='20' w='100%' in={opened}>
          <List mb='0' mt='xs' spacing='xs'>
            {items}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}
