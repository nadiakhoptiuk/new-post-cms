import { loginUser } from "~/shared/.server/services/auth";
import type { Route } from "./+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await loginUser(request);
}
