import { Outlet, useLoaderData } from "react-router";

import { Home } from "~/shared/components/layout/Home";

// import i18n from "~/shared/services/i18n";
// import { commitSession, getSession } from "~/shared/.server/services/session";
// import { SESSION_LOCALE_KEY } from "~/shared/constants/common";
import type { THomeLoader } from "~/shared/types/react";
// import type { Route } from "./+types/route";

// export { loader } from "./loader";

// export async function action({ request }: Route.LoaderArgs) {
//   const formData = await request.formData();
//   const locale = formData.get("locale");

//   console.log("EXECUTE HOME ACTION, locale", locale);

//   const session = await getSession(request.headers.get("cookie"));

//   if (typeof locale === "string" && i18n.supportedLngs.includes(locale)) {
//     session.set(SESSION_LOCALE_KEY, locale);
//   }

//   return Response.json(
//     { locale },
//     {
//       headers: {
//         "Set-Cookie": await commitSession(session),
//       },
//     }
//   );
// }

// export const handle = {
//   i18n: ["common", "auth"],
// };

export default function HomeLayout() {
  const data = useLoaderData<THomeLoader>();

  return (
    <Home user={data?.user}>
      <Outlet />
    </Home>
  );
}
