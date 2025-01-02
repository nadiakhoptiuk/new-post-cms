import type { UNSAFE_RouteModules } from "react-router";

declare global {
  interface Window {
    __reactRouterRouteModules: UNSAFE_RouteModules;
  }
}

export function getMyInitialNamespaces(): string[] {
  let namespaces = Object.values(window.__reactRouterRouteModules).flatMap(
    (route) => {
      if (typeof route?.handle !== "object") return [];
      if (!route.handle) return [];
      if (!("i18n" in route.handle)) return [];
      if (typeof route.handle.i18n === "string") return [route.handle.i18n];
      if (
        Array.isArray(route.handle.i18n) &&
        route.handle.i18n.every((value: unknown) => typeof value === "string")
      ) {
        return route.handle.i18n as string[];
      }
      return [];
    }
  );

  return [...namespaces];
}
