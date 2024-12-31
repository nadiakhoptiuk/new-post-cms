import { NavigationLink } from "~/shared/constants/navigation";
import type { TRolesEnum } from "~/shared/types/react";
import { ROLE_USER, ROLE_ADMIN } from "~/shared/constants/common";

export type GetCurrentUserOptions = {
  failureRedirect?: (typeof NavigationLink)[keyof typeof NavigationLink];
  successRedirect?: (typeof NavigationLink)[keyof typeof NavigationLink];
};

export type GetRouteOptions = {
  isPublicRoute: boolean;
  allowedRoles: TRolesEnum[];
  allowedRoutes: Partial<
    Record<typeof ROLE_ADMIN | typeof ROLE_USER, NavigationLink>
  >;
  isAuthRoute?: boolean;
};
