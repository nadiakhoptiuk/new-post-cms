import { TLocale } from "~/shared/types/remix";

export type TBurgerMenu = {
  opened: boolean;
  close: () => void;
  locale: TLocale;
  hiddenFrom?: string;
};
