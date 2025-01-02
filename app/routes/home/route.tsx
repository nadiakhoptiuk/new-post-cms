import { Outlet, useLoaderData } from "react-router";

import { Home } from "~/shared/components/layout/Home";

import type { THomeLoader } from "~/shared/types/react";

export { loader } from "./loader";

export const handle = {
  i18n: ["common", "auth"],
};

export default function HomeLayout() {
  const data = useLoaderData<THomeLoader>();

  return (
    <Home user={data?.user}>
      <Outlet />
    </Home>
  );
}
