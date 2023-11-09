import { relations } from "drizzle-orm";
import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
  tinyint,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().notNull().primaryKey(),
  username: varchar("username", { length: 255 }),
  password: varchar("password", { length: 255 }),
  created_at: timestamp("created_at", { mode: "string" }),
});

export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().notNull().primaryKey(),
  title: varchar("title", { length: 255 }),
  content: text("content"),
  created_at: timestamp("created_at", { mode: "string" }),
  updated_at: timestamp("updated_at", { mode: "string" }),
  is_public: tinyint("is_public").notNull().default(0),
  deleted: tinyint("deleted").notNull().default(0),
  user_id: int("user_id").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  documents: many(documents),
}));

export const blocksRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.user_id],
    references: [users.id],
  }),
}));
