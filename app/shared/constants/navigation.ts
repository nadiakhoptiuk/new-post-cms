import {
  IconTags,
  IconUsers,
  IconAlertSquareRounded,
  IconPencilMinus,
  IconNotebook,
  IconHourglassHigh,
  IconLogin,
  IconUserScan,
  IconUserPlus,
} from "@tabler/icons-react";

export const enum NavigationLink {
  HOME = "/",

  DASHBOARD = "/dashboard",
  DASHBOARD_MY_POSTS = "/dashboard/my-posts",
  DASHBOARD_ALL_POSTS = "/dashboard/posts/all",
  DASHBOARD_POSTS_ON_MODERATION = "/dashboard/posts/on-moderation",
  DASHBOARD_POSTS_COMPLAINTS = "/dashboard/posts/complaints",
  DASHBOARD_USERS = "/dashboard/users",
  DASHBOARD_USERS_NEW = "/dashboard/users/new",
  DASHBOARD_CURRENT_USER = "/dashboard/users/:userId",
  DASHBOARD_TAGS = "/dashboard/tags",

  LOGIN = "/login",
  LOGOUT = "/logout",
  DELETE_ACCOUNT = "/delete-account",

  MY_POSTS = "/my-posts",
  PROFILE = "/profile",
  SIGNUP = "/signup",

  CHANGE_LANGUAGE = "change-language",
  DELETE_USER = "delete-user",
  RESTORE_USER = "restore-user",
}

export const DashboardNavLinks = [
  {
    id: "dashboard.myPosts",
    link: NavigationLink.DASHBOARD_MY_POSTS,
    icon: IconPencilMinus,
  },
  {
    id: "dashboard.posts",
    icon: IconNotebook,
    links: [
      {
        id: "dashboard.allPosts",
        link: NavigationLink.DASHBOARD_ALL_POSTS,
        icon: IconNotebook,
      },
      {
        id: "dashboard.onModeration",
        link: NavigationLink.DASHBOARD_POSTS_ON_MODERATION,
        icon: IconHourglassHigh,
      },
      {
        id: "dashboard.postsComplains",
        link: NavigationLink.DASHBOARD_POSTS_COMPLAINTS,
        icon: IconAlertSquareRounded,
      },
    ],
  },
  {
    id: "dashboard.users",
    link: NavigationLink.DASHBOARD_USERS,
    icon: IconUsers,
  },
  {
    id: "dashboard.tags",
    link: NavigationLink.DASHBOARD_TAGS,
    icon: IconTags,
  },
];

export const AuthNavLinks = [
  { id: "auth.login", link: NavigationLink.LOGIN, icon: IconLogin },
  { id: "auth.signup", link: NavigationLink.SIGNUP, icon: IconUserPlus },
];

export const UserBarNavLinks = [
  { id: "profile", link: NavigationLink.PROFILE, icon: IconUserScan },
  { id: "myPosts", link: NavigationLink.MY_POSTS, icon: IconPencilMinus },
];
