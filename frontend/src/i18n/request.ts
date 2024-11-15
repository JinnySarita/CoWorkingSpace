import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const defaultLocale = "th";
  const locale = cookies().get("locale")?.value || defaultLocale;

  return {
    locale,
    messages: (await import(`../../locale/${locale}/index.json`)).default,
  };
});
