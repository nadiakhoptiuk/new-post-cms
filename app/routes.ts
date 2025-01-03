import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";
import { NavigationLink } from "./shared/constants/navigation";

export default [
  index("./routes/home/route.tsx"),

  layout("./routes/_auth/route.tsx", [
    route(NavigationLink.LOGIN, "./routes/_auth.login/route.tsx"),
    route(NavigationLink.SIGNUP, "./routes/_auth.signup/route.tsx"),
    route(NavigationLink.LOGOUT, "./routes/api/logout.ts"),
  ]),

  layout("routes/dashboard/route.tsx", [
    route(NavigationLink.DASHBOARD, "./routes/dashboard.home/route.tsx"),
    route(NavigationLink.DASHBOARD_USERS, "./routes/dashboard.users/route.tsx"),
    route(
      NavigationLink.DASHBOARD_USERS_NEW,
      "./routes/dashboard.users.new/route.tsx"
    ),
    route(
      NavigationLink.DASHBOARD_CURRENT_USER,
      "./routes/dashboard.users_.$userId/route.tsx",
      [
        route(NavigationLink.DELETE_USER, "./routes/api/deleteUser.ts"),
        route(NavigationLink.RESTORE_USER, "./routes/api/restoreUser.ts"),
      ]
    ),

    ...prefix("posts", [
      route("all", "./routes/dashboard.posts.all/route.tsx"),
    ]),
  ]),

  route(NavigationLink.DELETE_ACCOUNT, "./routes/api/deleteAccount.ts"),
  route(NavigationLink.CHANGE_LANGUAGE, "./routes/api/changeLanguage.ts"),
] satisfies RouteConfig;
