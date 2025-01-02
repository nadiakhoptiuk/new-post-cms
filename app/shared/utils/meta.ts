import type { MetaDescriptor, MetaFunction } from "react-router";
import type { Route } from "../../+types/root";

export type LoaderDataWithMeta = {
  meta: Partial<MetaDescriptor>;
};

export type LoaderFunctionWithMeta = (
  args: Route.LoaderArgs
) => Promise<LoaderDataWithMeta>;

export const meta: MetaFunction<LoaderFunctionWithMeta> = ({ data }) => {
  if (!data) {
    return [];
  }

  return [data.meta];
};
