import { Request, Response } from "express"
import { db } from "../../db/index.js";
import { createProductZodSchema, productsTable } from "../../db/productsSchema.js";
import { eq, inArray } from "drizzle-orm";
import _ from 'lodash'
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";


export async function createOrder(req: Request, res: Response) {
    try {
        const { items, order } = req.cleanBody
        // const items = req.cleanBody.items
        const notes = order.notes
        const deliveryAddress = order.deliveryAddress
        console.log('====================================');
        console.log(req.cleanBody);
        console.log('====================================');

        // console.log(data, "cleanbody", items)
        const userId = req.userId
        if (!userId) {
            res.status(400).json({ error: true, message: "Invalid data, userId not found" })
            return
        }
        if (!deliveryAddress) {
            res.status(400).json({ error: true, message: "Please insert you address or pick from the map" })
            return
        }
        const [newOrder] = await db.insert(ordersTable).values({ userId: Number(userId), notes: notes, deliveryAddress }).returning()
        const productIds = items.map((product: any) => product.productId)
        const productDetails = await db.select().from(productsTable).where(inArray(productsTable.id, productIds))
        const productMap = productDetails.reduce((acc: Record<number, typeof productDetails[0]>, product) => {
            acc[product.id] = product;
            return acc;
        }, {});



        const orderitems = items.map((item: any) => {
            const product = productMap[item.productId];
            console.log('====================================');
            console.log(product);
            console.log('====================================');
            if (!product) {
                throw new Error(`Invalid productId: ${item.productId}`);
            }
            return {
                ...item,
                orderId: newOrder.id,
                price: product.price, // Use the accurate price
                name: product.name, // Include additional product data if needed
                description: product.description,

            }
        }
        )

        console.log(orderitems, " fas")

        //VALIDATE IDS AND TAKE THE ACTUAL PRICE HERE
        await db.insert(orderItemsTable).values(orderitems).returning()

        res.status(201).json({ ...newOrder, item: orderitems })
        return
    } catch (e) {
        res.status(500).json({ error: true, message: e })
        return
    }

}

// if role is admin return all orders, if req.role==="seller" return orders by sellars
//list order based on user id
export async function listOrders(req: Request, res: Response) {
    try {
        const userId = req.userId;
        const role = req.role;

        console.log('====================================');
        console.log(role);
        console.log('====================================');

        if (!userId) {
            res.status(400).json({ error: true, message: "Invalid data, userId not found" });
            return;
        }

        let rawOrders;

        if (role?.toLowerCase() === 'user') {
            rawOrders = await db
                .select()
                .from(ordersTable)
                .where(eq(ordersTable.userId, Number(userId)))
                .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId))
                .leftJoin(productsTable, eq(orderItemsTable.productId, productsTable.id));
        } else if (role?.toLowerCase() === 'admin') {
            console.log('==================ADMIN==================');
            console.log(role);
            console.log('====================================');

            rawOrders = await db
                .select()
                .from(ordersTable)
                .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId))
                .leftJoin(productsTable, eq(orderItemsTable.productId, productsTable.id));
        } else {
            res.status(403).json({ error: true, message: "Unauthorized access" });
            return;
        }

        // Group the products by their orderId
        const groupedOrders = rawOrders.reduce((acc: any, row: any) => {
            const orderId = row.orders.id;

            // Check if the order already exists in the accumulator
            if (!acc[orderId]) {
                acc[orderId] = {
                    ...row.orders,
                    products: [], // Initialize an empty array for products
                };
            }

            // Add the product details from the `productsTable` and `order_products`
            if (row.order_products && row.products) {
                acc[orderId].products.push({
                    ...row.order_products,
                    ...row.products, // Add all product fields
                });
            }

            return acc;
        }, {});

        // Convert the grouped object into an array
        const formattedOrders = Object.values(groupedOrders);

        res.status(201).json({ error: false, data: formattedOrders });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
}


export async function getOrderById(req: Request, res: Response) {
    try {
        const { id } = req.params;

        // Query the order by ID with associated products
        const rawOrderData = await db
            .select()
            .from(ordersTable)
            .where(eq(ordersTable.id, Number(id)))
            .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId))
            .leftJoin(productsTable, eq(orderItemsTable.productId, productsTable.id));

        // Check if the order exists
        if (!rawOrderData.length) {
            res.status(404).json({ error: true, message: "Order not found" });
            return;
        }

        // Structure the order data with associated products
        const formattedOrder = rawOrderData.reduce(
            (acc: any, row: any) => {
                // If the order details haven't been added yet, add them
                if (!acc.id) {
                    acc = {
                        ...row.orders,
                        products: [], // Initialize an empty array for products
                    };
                }

                // Add product details to the `products` array
                if (row.order_products && row.products) {
                    acc.products.push({
                        ...row.order_products,
                        ...row.products, // Add all fields from the products table
                    });
                }

                return acc;
            },
            {} // Initial accumulator
        );

        res.status(201).json({ error: false, data: formattedOrder });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
}



export async function updateOrderItems(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const updatedFields = req.cleanBody

        const [updatedOrder] = await db.update(ordersTable).set(updatedFields).where(eq(ordersTable.id, id)).returning()
        const userId = req.userId

        if (!userId) {
            res.status(400).json({ error: true, message: "Invalid data, userId not found" })
            return
        }
        if (updatedOrder) {
            res.json(updatedOrder)
            return
        } else {
            res.status(404).send({ error: true, message: "Order not found" })
            return
        }
    } catch (error) {
        res.status(404).send({ error: true, message: error })
        return
    }
}

export async function deleteOrder(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const [deleteProduct] = await db.delete(ordersTable).where(eq(ordersTable.id, id)).returning()
        if (deleteProduct) {
            res.status(204).send()
            return
        } else {
            res.status(404).send({ error: true, message: "product not found" })
            return
        }

    } catch (error) {
        res.status(500).send(error)
        return
    }
}



