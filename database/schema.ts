import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const rolesEnum = pgEnum("roles", ["admin", "user"]);

export const guestBook = pgTable("guestBook", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).notNull().unique(),
});

export const users = pgTable("newUser", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: t.varchar({ length: 40 }).notNull(),
  lastName: t.varchar({ length: 40 }).notNull(),
  email: t.varchar({ length: 40 }).notNull().unique(),
  password: t.varchar({ length: 12 }).notNull(),
  role: rolesEnum().default("user"),
  ...timestamps,
});
