import { getAuthUser } from "~/shared/.server/services/auth";
import { commitSession, getSession } from "~/shared/.server/services/session";

import { SESSION_ERROR_KEY } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
  await getAuthUser(
    request,
    {
      isPublicRoute: true,
      allowedRoles: [],
      allowedRoutes: {
        admin: NavigationLink.DASHBOARD,
        user: NavigationLink.HOME,
      },
      isAuthRoute: true,
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );

  const session = await getSession(request.headers.get("cookie"));
  const error = session.get(SESSION_ERROR_KEY);
  session.unset(SESSION_ERROR_KEY);

  return Response.json(
    { error },
    {
      headers: {
        "Set-Cookie": await commitSession(session), // You must commit the session whenever you read a flash
      },
    }
  );
};
