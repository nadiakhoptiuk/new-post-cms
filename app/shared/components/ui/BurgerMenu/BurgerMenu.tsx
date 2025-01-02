import { Drawer, Group } from "@mantine/core";

import { Logo } from "../Logo";
import { LanguageSelector } from "../LanguageSelector";
import { AuthNav } from "../AuthNav";

import type { TBurgerMenu } from "./BurgerMenu.types";

export const BurgerMenu = ({
  opened,
  close,
  locale,
  hiddenFrom = "xs",
}: TBurgerMenu) => {
  return (
    <>
      <Drawer.Root
        opened={opened}
        onClose={close}
        padding='md'
        hiddenFrom={hiddenFrom}
        radius={0}
        zIndex={100}
        size='100%'
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Logo />

            <Drawer.CloseButton size='xl' />
          </Drawer.Header>

          <Drawer.Body>
            <Group p={20}>
              <AuthNav burgerMenu />
            </Group>

            <LanguageSelector
              locale={locale}
              styles={{
                root: {
                  width: "fit-content",
                  paddingLeft: "20px",
                  marginTop: "auto",
                },
              }}
            />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};
