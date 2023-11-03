import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  primaryKey,
  int,
  varchar,
  text,
  timestamp,
  tinyint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const documents = mysqlTable(
  "documents",
  {
    id: int("id").autoincrement().notNull(),
    author: varchar("author", { length: 255 }),
    title: varchar("title", { length: 255 }),
    content: text("content"),
    createdAt: timestamp("createdAt", { mode: "string" }),
    deleted: tinyint("deleted"),
  },
  (table) => {
    return {
      documentsId: primaryKey(table.id),
    };
  }
);
