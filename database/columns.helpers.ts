import { timestamp } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./schema";

export const timestamps = {
  updatedAt: timestamp(),
  updatedById: t.integer().references((): t.AnyPgColumn => users.id),
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
};
