import { TSerializedUser, WithChildren } from "~/shared/types/react";

export type THomeLayout = {
  user: TSerializedUser;
} & WithChildren;
