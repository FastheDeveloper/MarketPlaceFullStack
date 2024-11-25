import { integer, pgTable, varchar, timestamp, doublePrecision, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { usersTable } from "./usersSchema.js";
import { productsTable } from "./productsSchema.js";
import { z } from 'zod';

export const ordersTable = pgTable('orders', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
    status: varchar({ length: 50 }).notNull().default('New'),

    userId: integer()  //One to many relationship User <===> Orders
        .references(() => usersTable.id)
        .notNull(),
    notes: text().default("")
    // stripePaymentIntentId: varchar({ length: 255 }),
});

export const orderItemsTable = pgTable("order_products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    orderId: integer()
        .references(() => ordersTable.id)
        .notNull(),
    productId: integer()
        .references(() => productsTable.id)
        .notNull(),

    quantity: integer().notNull().default(1),
    // price: doublePrecision().notNull(),
})

export const createOrderSchema = createInsertSchema(ordersTable).omit({  //dont ever change these things...OMIT
    id: true,
    userId: true,
    status: true,
    createdAt: true,

});

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
    id: true,
    orderId: true,
    // price: true,

});

export const createOrderWithItemSchema = z.object({
    order: createOrderSchema,
    items: z.array(insertOrderItemSchema),
});

export const updateOrderSchema = createInsertSchema(ordersTable).pick({
    id: true,
    userId: true,
    status: true,
    createdAt: true,

});