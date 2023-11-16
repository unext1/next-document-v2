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
  email: varchar("email", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  role: text("role").default("user"),
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
  category_id: int("category_id").notNull(),
});

export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  documents: many(documents),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.user_id],
    references: [users.id],
  }),
  categories: one(categories, {
    fields: [documents.category_id],
    references: [categories.id],
  }),
}));
