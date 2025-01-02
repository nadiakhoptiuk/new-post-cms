import { commitSession, getSession } from "~/shared/.server/services/session";
import i18n from "~/shared/services/i18n";

import { SESSION_LOCALE_KEY } from "~/shared/constants/common";
import type { Route } from "../../+types/root";

export async function action({ request }: Route.LoaderArgs) {
  const formData = await request.formData();
  const locale = formData.get("locale");

  const session = await getSession(request.headers.get("cookie"));

  if (typeof locale === "string" && i18n.supportedLngs.includes(locale)) {
    session.set(SESSION_LOCALE_KEY, locale);
  }

  return Response.json(
    { locale },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}
