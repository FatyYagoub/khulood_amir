import strings from "../translations/strings";
import { defaultLocale } from "../translations/config";
import { useRouter } from "next/router";

export default function useTranslation() {
  const router = useRouter();
  const { locale } = router;

  function t(key) {
    if (!strings[locale][key]) {
      console.warn(`Translation '${key}' for locale '${locale}' not found.`);
    }
    return strings[locale][key] || strings[defaultLocale][key] || "";
  }

  return {
    t,
    locale,
  };
}
