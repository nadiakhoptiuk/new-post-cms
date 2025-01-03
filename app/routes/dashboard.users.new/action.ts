import { redirect } from "react-router";

import { createNewUser } from "~/shared/.server/repository/users";

import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../dashboard.users/+types/route";
import type { TRolesEnum } from "~/shared/types/react";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role") as TRolesEnum;

  if (
    !role ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return Response.json({
      error: "Name or email or password are not strings",
    });
  }

  try {
    await createNewUser({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    return redirect(NavigationLink.DASHBOARD_USERS);
  } catch (error) {
    return Response.json(
      {
        error: "An unexpected error occurred",
      },
      { status: 400 }
    );
  }
}
