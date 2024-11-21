import { Router } from "express"
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "./productsController"
import { validateData } from "../../middlewares/validationMiddleware"
import { createProductZodSchema, updateProductZodSchema } from "../../db/productsSchema"


const router=Router()

router.get('/',listProducts)
router.get('/:id',getProductById)
router.post("/",validateData(createProductZodSchema),createProduct)
router.put("/:id",validateData(updateProductZodSchema),updateProduct)
router.delete('/:id',deleteProduct)

export default router; 