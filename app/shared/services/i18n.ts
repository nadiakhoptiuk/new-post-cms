import { DEFAULT_LANG, DEFAULT_NS, LANGUAGES } from "~/shared/constants/locale";

export default {
  // This is the list of languages your application supports
  supportedLngs: LANGUAGES,
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: DEFAULT_LANG,
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: DEFAULT_NS,
};
