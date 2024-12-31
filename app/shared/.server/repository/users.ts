import { db } from "server/app";
import { passwordHash, verifyPassword } from "../utils/usersUtils";

import type {
  TSerializedUser,
  TUpdatedById,
  TUser,
  TUserPassword,
} from "~/shared/types/react";
import { users } from "~/database/schema";
import { eq } from "drizzle-orm";

export async function createNewUser(userData: TUser & TUserPassword) {
  const { password, ...userDataWithOutPassword } = userData;

  const existedUser = await db
    .select()
    .from(users)
    .where(eq(users.email, userDataWithOutPassword.email));

  if (existedUser) {
    throw new Error("User with such email is already exist in database");
  }

  const hashedPassword = await passwordHash(password);

  return await db
    .insert(users)
    .values({ ...userDataWithOutPassword, password: hashedPassword });
}

export async function verifyUserAndSerialize(email: string, password: string) {
  const existedUser = await db
    .select({
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      id: users.id,
      createdAt: users.createdAt,
      role: users.role,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.email, email));

  console.log(existedUser);

  if (!existedUser) {
    throw new Error("User with such email does not exist in database");
  }

  const serializedUser: TSerializedUser | null = await verifyPassword(
    existedUser,
    password as string
  );

  if (!serializedUser) {
    throw new Error("Invalid username or password");
  }

  return serializedUser;
}

export async function getAllUsers() {
  const sq = db
    .select({
      firstName: users.firstName,
      lastName: users.lastName,
      id: users.id,
    })
    .from(users)
    .as("sq");

  const allUsers = await db
    .select({
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      id: users.id,
      createdAt: users.createdAt,
      role: users.role,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .leftJoin(sq, eq(users.updatedById, sq.id))
    .orderBy(users.lastName, users.firstName);

  return allUsers;
}

export async function getUserById(id: number) {
  const existedUser = await db
    .select({
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      id: users.id,
      createdAt: users.createdAt,
      role: users.role,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, id));

  return existedUser;
}

export async function updateUserById(
  id: number,
  userData: TUser & TUserPassword & TUpdatedById
) {
  const existedUser = await getUserById(id);

  if (!existedUser) {
    throw new Error("User with such id does not exist");
  }

  const { password, ...userDataWithOutPassword } = userData;

  const hashedPassword = await passwordHash(password);

  const updatedUser = await db
    .update(users)
    .set({ ...userDataWithOutPassword, password: hashedPassword })
    .where(eq(users.id, id));

  return updatedUser;
}
