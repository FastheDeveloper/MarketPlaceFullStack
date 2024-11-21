import { integer, pgTable, varchar,text, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema ,createSelectSchema} from "drizzle-zod"

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description:text(),
  image: varchar({ length: 255 }),
  price:doublePrecision().notNull(),
});


export const createProductZodSchema=createInsertSchema(productsTable).omit({
  id:true
})

export const updateProductZodSchema=createInsertSchema(productsTable).omit({
  id:true //cant change id
}).partial()