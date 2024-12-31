import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home/route.tsx"),

  layout("./routes/_auth/route.tsx", [
    route("login", "./routes/_auth.login/route.tsx"),
    route("signup", "./routes/_auth.signup/route.tsx"),
  ]),

  // route("dashboard", "routes/dashboard/route.tsx", [
  //   route("users", "./routes/dashboard.users/route.tsx", [
  //     route(":userId", "./routes/dashboard.users_.$userId/route.tsx"),
  //   ]),

  //   ...prefix("posts", [
  //     route("all", "./routes/dashboard.posts.all/route.tsx"),
  //   ]),
  // ]),
] satisfies RouteConfig;
