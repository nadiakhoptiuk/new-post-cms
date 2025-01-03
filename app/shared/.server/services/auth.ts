import { redirect } from "react-router";
import { DrizzleError } from "drizzle-orm";

import {
  createNewUser,
  deleteUserById,
  getUserById,
  verifyUserAndSerialize,
} from "../repository/users";
import { commitSession, getSession } from "./session";

import type { TSerializedUser } from "~/shared/types/react";
import type { GetCurrentUserOptions, GetRouteOptions } from "../types/common";
import { NavigationLink } from "~/shared/constants/navigation";
import {
  ROLE_ADMIN,
  SESSION_ERROR_KEY,
  SESSION_USER_KEY,
} from "~/shared/constants/common";
// import { errorHandler } from "../utils/errorHandler";

export const loginUser = async (request: Request) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("invalid data");
  }

  const session = await getSession(request.headers.get("cookie"));

  try {
    const serializedUser = await verifyUserAndSerialize(email, password);

    session.set(SESSION_USER_KEY, serializedUser);
    const userRole = serializedUser.role;

    const successRedirect =
      userRole === ROLE_ADMIN ? NavigationLink.DASHBOARD : NavigationLink.HOME;

    return redirect(successRedirect, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch (error) {
    if (error instanceof DrizzleError) {
      session.set(SESSION_ERROR_KEY, "Wrong request to database");
      throw redirect(NavigationLink.SIGNUP, {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    } else if (error instanceof Error) {
      session.set(SESSION_ERROR_KEY, error.message);

      throw redirect(NavigationLink.LOGIN, {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }

    return error;
  }
};

export const signupUser = async (request: Request) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const password = formData.get("password");

  if (
    typeof firstName !== "string" ||
    typeof email !== "string" ||
    typeof lastName !== "string" ||
    typeof password !== "string"
  ) {
    throw new Error("invalid data");
  }

  const session = await getSession(request.headers.get("cookie"));
  try {
    await createNewUser({
      firstName,
      lastName,
      email,
      password,
    });

    return redirect(NavigationLink.LOGIN, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch (error) {
    if (error instanceof DrizzleError) {
      session.set(SESSION_ERROR_KEY, "Wrong request to database");
      throw redirect(NavigationLink.SIGNUP, {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    } else if (error instanceof Error) {
      session.set(SESSION_ERROR_KEY, error.message);

      throw redirect(NavigationLink.SIGNUP, {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }
    return error;
  }
};

export const logoutUser = async (
  request: Request,
  options?: GetCurrentUserOptions
) => {
  const { successRedirect } = options || {};

  const session = await getSession(request.headers.get("Cookie"));
  session.unset(SESSION_USER_KEY);

  // return redirect(successRedirect || NavigationLink.HOME, {
  //   headers: {
  //     "Set-Cookie": await commitSession(session),
  //   },
  // });
  return new Response(null, {
    status: 302,
    headers: {
      Location: successRedirect || NavigationLink.HOME,
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const deleteUserAccount = async (
  request: Request,
  options?: GetCurrentUserOptions
) => {
  const { successRedirect } = options || {};

  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get(SESSION_USER_KEY).id;

  const deletedUser = await deleteUserById(userId, userId);

  if (deletedUser.deletedAt !== null) {
    session.unset(SESSION_USER_KEY);

    // return redirect(successRedirect || NavigationLink.HOME, {
    //   headers: {
    //     "Set-Cookie": await commitSession(session),
    //   },
    // });
    return new Response(null, {
      status: 302,
      headers: {
        Location: successRedirect || NavigationLink.HOME,
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export const getAuthUser = async (
  request: Request,
  routeOptions: GetRouteOptions,
  options?: GetCurrentUserOptions
) => {
  const { failureRedirect } = options || {};
  const {
    isPublicRoute,
    allowedRoles,
    allowedRoutes,
    isAuthRoute = false,
  } = routeOptions;

  // try {
  const session = await getSession(request.headers.get("Cookie"));
  const sessionUser: TSerializedUser = session.get(SESSION_USER_KEY);

  if (!sessionUser && !isPublicRoute) {
    session.unset(SESSION_USER_KEY);
    throw redirect(failureRedirect || NavigationLink.LOGIN, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (!sessionUser && isAuthRoute) {
    return null;
  }

  if (!sessionUser && isPublicRoute) {
    return null;
  }

  const existedUser = await getUserById(sessionUser.id);

  if (existedUser && existedUser.deletedAt !== null) {
    throw redirect(NavigationLink.HOME, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (existedUser && isAuthRoute) {
    throw redirect(allowedRoutes[sessionUser.role] || NavigationLink.HOME, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (!existedUser && !isPublicRoute) {
    session.unset(SESSION_USER_KEY);
    throw redirect(failureRedirect || NavigationLink.LOGIN, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (existedUser && !allowedRoles.includes(sessionUser.role)) {
    throw redirect(allowedRoutes[sessionUser.role] || NavigationLink.HOME, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return sessionUser;
  // } catch (error) {
  //   console.error("Error during auth process", error);
  //   errorHandler(error);
  // }
};
