import bcrypt from "bcryptjs";
import type {
  TDBUser,
  TSerializedUser,
  TUserPassword,
} from "~/shared/types/react";

export async function passwordHash(password: string): Promise<string> {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

export async function checkPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export const serializeUser = (
  user: TDBUser & TUserPassword
): TSerializedUser => {
  const { id, firstName, lastName, role } = user;

  return { firstName, lastName, role, id };
};

export const verifyPasswordAndSerialize = async (
  user: TDBUser & TUserPassword,
  enteredPassword: string
): Promise<TSerializedUser | null> => {
  const isPasswordValid = await checkPassword(enteredPassword, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return serializeUser(user);
};
