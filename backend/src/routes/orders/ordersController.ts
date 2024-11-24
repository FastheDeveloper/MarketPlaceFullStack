import { Request, Response } from "express"
import { db } from "../../db/index.js";
import { createProductZodSchema, productsTable } from "../../db/productsSchema.js";
import { eq } from "drizzle-orm";
import _ from 'lodash'
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";


export async function createOrder(req: Request, res: Response) {
    try {
        const { items, order } = req.cleanBody
        // const items = req.cleanBody.items
        const notes = order.notes
        // console.log(data, "cleanbody", items)
        const userId = req.userId
        if (!userId) {
            res.status(400).json({ error: true, message: "Invalid data, userId not found" })
            return
        }
        const [newOrder] = await db.insert(ordersTable).values({ userId: Number(userId), notes: notes, }).returning()

        const orderitems = items.map((item: any) => ({
            ...item,
            orderId: newOrder.id
        }))


        //VALIDATE IDS AND TAKE THE ACTUAL PRICE HERE
        const newOrderItems = await db.insert(orderItemsTable).values(orderitems).returning()

        res.status(201).json({ ...newOrder, item: newOrderItems })
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
        res.status(201).json({ yaay: "yaay" })

    } catch (error) {

    }
}

export async function getOrderById(req: Request, res: Response) {
    try {
        res.status(201).json({ yaay: "yaay" })

    } catch (error) {

    }
}


export async function updateOrderItems(req: Request, res: Response) {
    try {
        res.status(201).json({ yaay: "yaay" })

    } catch (error) {

    }
}

export async function deleteOrder(req: Request, res: Response) {
    try {
        res.status(201).json({ yaay: "yaay" })

    } catch (error) {

    }
}



