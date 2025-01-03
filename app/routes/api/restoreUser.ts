// import { redirect } from "react-router";

import { restoreUserById } from "~/shared/.server/repository/users";

import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../../+types/root";

export async function action({ params }: Route.ActionArgs) {
  const userId = params.userId;

  const restoredUser = await restoreUserById(Number(userId));

  if (!restoredUser) {
    throw new Error("something went wrong");
  }

  // return redirect(NavigationLink.DASHBOARD_USERS);

  return new Response(null, {
    status: 302,
    headers: {
      Location: NavigationLink.DASHBOARD_USERS,
    },
  });
}
