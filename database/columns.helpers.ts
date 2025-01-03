import { timestamp } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./schema";

export const timestamps = {
  updatedAt: timestamp(),
  updatedById: t.integer().references((): t.AnyPgColumn => users.id),
  createdAt: timestamp().defaultNow().notNull(),
};

export const userTimestamps = {
  ...timestamps,
  deletedAt: timestamp(),
  deletedById: t.integer().references((): t.AnyPgColumn => users.id),
};
