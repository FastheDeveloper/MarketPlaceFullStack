import { Request, Response } from "express"
import { db } from "../../db/index.js";
import { createProductZodSchema, productsTable } from "../../db/productsSchema.js";
import { eq } from "drizzle-orm";
import _ from 'lodash'


export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable)
    res.json(products)
    return
  } catch (error) {
    res.status(500).send(error)
    return
  }

}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const [products] = await db.select().from(productsTable).where(eq(productsTable.id, Number(id)))
    if (!products) {
      res.status(404).json([]);
      return;
    } else {
      res.json(products)
      return
    }
  } catch (error) {
    res.status(500).send(error)

  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    console.log(req.userId);
    const data = req.cleanBody
    const [product] = await db.insert(productsTable).values(data).returning()
    res.status(201).json(product)
    return
  } catch (error) {
    res.status(500).send(error)
    return
  }

}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const updatedFields = req.cleanBody

    const [updatedProduct] = await db.update(productsTable).set(updatedFields).where(eq(productsTable.id, id)).returning()
    if (updatedProduct) {
      res.json(updatedProduct)
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

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const [deleteProduct] = await db.delete(productsTable).where(eq(productsTable.id, id)).returning()
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