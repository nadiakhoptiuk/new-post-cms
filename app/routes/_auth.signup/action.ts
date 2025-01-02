import { signupUser } from "~/shared/.server/services/auth";
import type { Route } from "./+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await signupUser(request);
}
