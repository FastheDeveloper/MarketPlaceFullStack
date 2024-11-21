import { Request,Response } from "express"
import { db } from "../../db";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";

export async function listProducts (req:Request,res:Response){
  try {
  const products=await db.select().from(productsTable)
  res.json(products)
  } catch (error) {
    res.status(500).send(error)
    
  }
  res.send("listProducts")
  }

export async function getProductById(req:Request,res:Response){
  try {
    const {id}=req.params
    const [products]=await db.select().from(productsTable).where(eq(productsTable.id,Number(id)))
    if (!products) {
      res.status(404).json([]); 
      return; 
    }else{
      res.json(products)
    }
  } catch (error) {
    res.status(500).send(error)
    
  }
  }

  export async function  createProduct(req:Request,res:Response){
    try {
      const [product]= await db.insert(productsTable).values(req.body).returning()
      res.status(201).json(product)
    } catch (error) {
      res.status(500).send(error)
    }

  }

  export async function updateProduct(req:Request,res:Response){
    try {
      const id=Number(req.params.id)
      const updatedFields=req.body

    const [updatedProduct]=await  db.update(productsTable).set(updatedFields).where(eq(productsTable.id,id)).returning()
    if(updatedProduct){
      res.json(updatedProduct)
      return
    }else{
      res.status(404).send({error:true,message:"product not found"})
      return
    }
  } catch (error) {
      res.status(500).send(error)
      
    }
    res.send("updateProduct")
  }

  export async function deleteProduct(req:Request,res:Response){
    try {
      const id=Number(req.params.id)
     const [deleteProduct]= await db.delete(productsTable).where(eq(productsTable.id,id)).returning()
      if(deleteProduct){
          res.status(204).send()
          return
      }else{
        res.status(404).send({error:true,message:"product not found"})
        return
      }

    } catch (error) {
      res.status(500).send(error)
      
    }
  }