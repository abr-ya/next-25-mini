import { sql } from "drizzle-orm";
import { date, integer, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  type: text({
    enum: ["income", "expense"],
  }).notNull(),
});

export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id").notNull(),
  description: text().notNull(),
  amount: numeric().notNull(),
  transactionDate: date("transaction_date").notNull(),
  categoryId: integer("category_id")
    .references(() => categoriesTable.id)
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// LinkList Part
export const linkPagesTable = pgTable("link_pages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id").notNull(),
  url: text().notNull(),
  bgType: text("bg_type", {
    enum: ["color", "image"],
  }).notNull(),
  bgColor: text("bg_color").notNull().default("#ffffff"),
  bgImage: text("bg_image"),
  userImage: text("user_image"),
  displayName: text("display_name"),
  location: text(),
  bio: text(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const linkItemsTable = pgTable("link_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  pageId: integer("page_id")
    .references(() => linkPagesTable.id)
    .notNull(),
  title: text().notNull(),
  url: text().notNull(),
  description: text(),
  order: integer().notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
