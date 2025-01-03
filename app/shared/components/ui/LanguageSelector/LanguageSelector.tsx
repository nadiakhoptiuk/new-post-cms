import { useFetcher } from "react-router";
import { NativeSelect } from "@mantine/core";

import { DEFAULT_LANG, LANGUAGES } from "~/shared/constants/locale";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TLanguageSelector } from "./LanguageSelector.types";

export const LanguageSelector = ({ locale, ...rest }: TLanguageSelector) => {
  const fetcher = useFetcher();

  return (
    <NativeSelect
      onChange={(e) =>
        fetcher.submit(
          { locale: e.target.value.toLowerCase() },
          {
            method: "POST",
            action: NavigationLink.CHANGE_LANGUAGE,
          }
        )
      }
      data={LANGUAGES.map((lng) => lng.toUpperCase())}
      defaultValue={locale.toUpperCase() || DEFAULT_LANG}
      size='sm'
      fw={500}
      {...rest}
    />
  );
};
