import { Form } from "react-router";
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
// import { useTranslation } from "react-i18next";
import { IconChevronDown, IconLogout, IconTrash } from "@tabler/icons-react";

import { StyledNavLink } from "../StyledNavLink/StyledNavLink";
import { Button } from "../Button";
// import { LanguageSelector } from "../LanguageSelector";

import { NavigationLink, UserBarNavLinks } from "~/shared/constants/navigation";
import type { TUserBar } from "./UserBar.types";

export const UserBar = ({ user }: TUserBar) => {
  // const { t } = useTranslation();

  return (
    <Menu
      width={200}
      position='bottom-end'
      transitionProps={{ transition: "pop-top-right" }}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton>
          <Group gap={7}>
            <Avatar alt='user' color='cyan' radius='xl' size={30} />

            <Text fw={500} size='sm' visibleFrom='xs' lh={1} mr={3}>
              {user.firstName} {user.lastName}
            </Text>

            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown component='div' p='xs'>
        {UserBarNavLinks.map(({ id, link, icon: Icon }) => {
          return (
            <Menu.Item key={id} component='div' p='0'>
              <StyledNavLink to={link} fullWidth>
                {Icon && <Icon size={22} />}

                {/* {t(`userBarNavLinks.${id}`)} */}
              </StyledNavLink>
            </Menu.Item>
          );
        })}

        <Menu.Divider styles={{ divider: { margin: "8px" } }} />
        {/* <LanguageSelector
          locale={locale}
          styles={{
            root: { width: "fit-content", padding: "8px 12px" },
          }}
        /> */}

        <Menu.Divider styles={{ divider: { margin: "8px" } }} />
        <Menu.Item component='div' p='0'>
          <Form action={NavigationLink.LOGOUT} method='post'>
            <Button
              type='submit'
              c='gray'
              styles={{
                root: { width: "100%", padding: "8px 12px" },
                inner: { justifyContent: "flex-start" },
              }}
              variant='transparent'
            >
              <IconLogout size={22} stroke={1.5} style={{ marginRight: 10 }} />
              {/* {t("auth.logout")} */}
              logout
            </Button>
          </Form>
        </Menu.Item>

        <Menu.Divider styles={{ divider: { margin: "8px" } }} />
        <Menu.Item component='div' p='0' color='red'>
          <Form action={NavigationLink.DELETE_ACCOUNT} method='post'>
            <Button
              type='submit'
              c='red'
              styles={{
                root: { width: "100%", padding: "8px 12px" },
                inner: { justifyContent: "flex-start" },
              }}
              variant='transparent'
            >
              <IconTrash size={22} stroke={1.5} style={{ marginRight: 10 }} />
              {/* {t("auth.deleteAccount")} */}
              deleteAccount
            </Button>
          </Form>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
