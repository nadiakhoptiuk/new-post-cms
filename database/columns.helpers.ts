import { timestamp } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./schema";

export const timestamps = {
  updated_at: timestamp(),
  updatedById: t
    .integer("updated_by_id")
    .references((): t.AnyPgColumn => users.id),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};
