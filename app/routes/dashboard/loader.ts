import { getAuthUser } from "~/shared/.server/services/auth";
import { NavigationLink } from "~/shared/constants/navigation";

import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const sessionUser = await getAuthUser(
    request,
    {
      isPublicRoute: false,
      isAuthRoute: false,
      allowedRoles: ["admin"],
      allowedRoutes: { user: NavigationLink.HOME },
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );

  return Response.json({ user: sessionUser });
};
