import { getUserById } from "~/shared/.server/repository/users";

import type { Route } from "../dashboard.users/+types/route";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const user = await getUserById(Number(params.userId));

  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }

  return Response.json({ user });
};
