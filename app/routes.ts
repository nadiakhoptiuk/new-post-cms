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

  // route("dashboard", "routes/dashboard/route.tsx", [
  //   route("users", "./routes/dashboard.users/route.tsx", [
  //     route(":userId", "./routes/dashboard.users_.$userId/route.tsx"),
  //   ]),

  //   ...prefix("posts", [
  //     route("all", "./routes/dashboard.posts.all/route.tsx"),
  //   ]),
  // ]),
  route(NavigationLink.DELETE_ACCOUNT, "./routes/api/deleteAccount.ts"),
  route(NavigationLink.CHANGE_LANGUAGE, "./routes/api/changeLanguage.ts"),
] satisfies RouteConfig;
