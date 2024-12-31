import { createCookieSessionStorage } from "react-router";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET || "secret"],
    secure: process.env.ENVIRONMENT === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
