import { useRouteLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import type { TRootLoader } from "~/shared/.server/root/loader";

import { Logo } from "../../ui/Logo";
import { BurgerMenu } from "../../ui/BurgerMenu";
import { AuthBlockVsLang } from "../../modules/AuthBlockVsLang";

import type { WithChildren } from "~/shared/types/react";
import { DEFAULT_LANG } from "~/shared/constants/locale";

import classes from "./Auth.module.css";

export function AuthLayout({ children }: WithChildren) {
  const data = useRouteLoaderData<TRootLoader>("root");
  const { t } = useTranslation(["common", "auth"]);
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] =
    useDisclosure(false);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.inner}>
          <Group className={classes.mobileInner}>
            <Logo />
            <Burger
              opened={menuOpened}
              onClick={toggleMenu}
              hiddenFrom='xs'
              aria-label={t("aria.toggleMenu")}
            />

            <AuthBlockVsLang locale={data?.locale || DEFAULT_LANG} />
          </Group>
        </div>
      </header>

      <BurgerMenu
        close={closeMenu}
        opened={menuOpened}
        locale={data?.locale || DEFAULT_LANG}
        hiddenFrom='xs'
      />

      <main className='content'>{children}</main>
    </>
  );
}
