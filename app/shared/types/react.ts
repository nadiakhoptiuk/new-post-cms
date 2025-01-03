import { useLoaderData } from "react-router";
import type { TextInputProps as MTextInputProps } from "@mantine/core";
import type { FormScope } from "@rvf/react-router";

import type { LANG_EN, LANG_UK } from "../constants/locale";

export type NewSerializeFrom<T> = ReturnType<typeof useLoaderData<T>>;

export type WithChildren = {
  children: React.ReactNode;
};

export type TLocale = typeof LANG_EN | typeof LANG_UK;

export type TRolesEnum = "admin" | "user";

export type TErrorsMessages = {
  [key: string]: string;
};

export type TSignupData = {
  firstName: string;
  lastName: string;
  email: string;
  role?: TRolesEnum;
};

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  role: TRolesEnum;
};

export type TUpdatedById = {
  updatedById: number;
};

export type TUserPassword = {
  password: string;
};

export interface TDBUser extends TUser {
  id: number;
  createdAt: Date;
  updatedAt?: Date | null;
  updatedBy?: string;
  updatedById?: number | null;
  deletedAt?: Date | null;
  deletedBy?: string;
  deletedById?: number | null;
}

export interface TSerializedUser {
  id: number;
  firstName: string;
  lastName: string;
  role: TRolesEnum;
}

export type THomeLoader = {
  user: TSerializedUser;
};

export interface TTextInput extends MTextInputProps {
  label: string;
  scope: FormScope<string>;
  placeholder?: string;
}
