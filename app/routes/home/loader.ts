import { getAuthUser } from "~/shared/.server/services/auth";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const sessionUser = await getAuthUser(
    request,
    {
      isPublicRoute: true,
      allowedRoles: ["user"],
      allowedRoutes: { admin: NavigationLink.DASHBOARD },
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );

  return Response.json({ user: sessionUser });
};
