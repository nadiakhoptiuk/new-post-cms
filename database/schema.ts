import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { userTimestamps } from "./columns.helpers";

export const rolesEnum = pgEnum("roles", ["admin", "user"]);

export const users = pgTable("User", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: t.varchar({ length: 40 }).notNull(),
  lastName: t.varchar({ length: 40 }).notNull(),
  email: t.varchar({ length: 255 }).notNull().unique(),
  password: t.varchar({ length: 255 }).notNull(),
  role: rolesEnum().notNull().default("user"),
  ...userTimestamps,
});
