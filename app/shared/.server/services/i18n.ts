import Backend from "i18next-fs-backend/cjs";
import { resolve } from "node:path";

import { MyRemixI18Next } from "./i18nextConstructor";
import i18nConfig from "~/shared/services/i18n"; // your i18n configuration file
import { sessionStorage } from "./session";

import { SESSION_LOCALE_KEY } from "~/shared/constants/common";

const i18next = new MyRemixI18Next({
  detection: {
    sessionStorage: sessionStorage,
    sessionKey: SESSION_LOCALE_KEY,
    supportedLanguages: i18nConfig.supportedLngs,
    fallbackLanguage: i18nConfig.fallbackLng,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only

  // i18next: {
  //   ...i18nConfig,
  //   backend: {
  //     loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
  //   },
  // },

  // The i18next plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
  // E.g. The Backend plugin for loading translations from the file system
  // Tip: You could pass `resources` to the `i18next` configuration and avoid a backend here
  plugins: [Backend],
});

export default i18next;
