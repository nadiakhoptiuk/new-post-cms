import type { NativeSelectProps } from "@mantine/core";

import type { TLocale } from "~/shared/types/react";

export interface TLanguageSelector extends NativeSelectProps {
  locale: TLocale;
}
