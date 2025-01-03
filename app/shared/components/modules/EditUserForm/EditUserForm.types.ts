import type { TUser } from "~/shared/types/react";

export type TEditUserForm = {
  userData: TUser;
  formType: "create" | "update";
  hasBeenDeleted?: boolean;
};
