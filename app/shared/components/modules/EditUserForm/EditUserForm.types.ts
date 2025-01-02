import { TUser } from "~/shared/types/remix";

export type TEditUserForm = { userData: TUser; formType: "create" | "update" };
