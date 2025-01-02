import { useRouteLoaderData } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { Burger, Group } from "@mantine/core";

import type { TRootLoader } from "~/shared/.server/root/loader";

import { UserBar } from "../../ui/UserBar";
import { Logo } from "../../ui/Logo";
import { BurgerMenu } from "../../ui/BurgerMenu";
import { AuthBlockVsLang } from "../../modules/AuthBlockVsLang";

import { DEFAULT_LANG } from "~/shared/constants/locale";
import type { THomeLayout } from "./Home.types";

import classes from "./Home.module.css";

export function Home({ children, user }: THomeLayout) {
  const data = useRouteLoaderData<TRootLoader>("root");
  const { t } = useTranslation(["common", "auth"]);
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] =
    useDisclosure(false);

  return (
    <>
      <header className={classes.header}>
        <Group className={classes.inner}>
          <Logo />
          {!user && (
            <Burger
              opened={menuOpened}
              onClick={toggleMenu}
              hiddenFrom='xs'
              aria-label={t("aria.toggleMenu", { ns: "common" })}
            />
          )}

          {!user && <AuthBlockVsLang locale={data?.locale || DEFAULT_LANG} />}

          {user && (
            <UserBar user={user} locale={data?.locale || DEFAULT_LANG} />
          )}
        </Group>

        {!user && (
          <BurgerMenu
            close={closeMenu}
            opened={menuOpened}
            locale={data?.locale || DEFAULT_LANG}
            hiddenFrom='xs'
          />
        )}
      </header>

      <main className='content'>{children}</main>
    </>
  );
}
