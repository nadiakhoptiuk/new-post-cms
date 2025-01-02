import { Box } from "@mantine/core";

import { AuthNav } from "../../ui/AuthNav";
import { LanguageSelector } from "../../ui/LanguageSelector";

import type { TLocale } from "~/shared/types/react";

export const AuthBlockVsLang = ({ locale }: { locale: TLocale }) => {
  return (
    <Box display='flex' style={{ columnGap: 20 }} visibleFrom='xs'>
      <AuthNav />
      <LanguageSelector
        locale={locale}
        styles={{
          root: { width: "fit-content" },
        }}
      />
    </Box>
  );
};
