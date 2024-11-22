import { Router } from "express"
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "./productsController"
import { validateData } from "../../middlewares/validationMiddleware"
import { createProductZodSchema, updateProductZodSchema } from "../../db/productsSchema"
import { verifyRoleIsSeller, verifyToken } from "../../middlewares/authMiddleware"


const router = Router()

router.get('/', listProducts)
router.get('/:id', getProductById)
router.post("/", verifyToken, verifyRoleIsSeller, validateData(createProductZodSchema), createProduct)
router.put("/:id", verifyToken, verifyRoleIsSeller, validateData(updateProductZodSchema), updateProduct)
router.delete('/:id', verifyToken, verifyRoleIsSeller, deleteProduct)

export default router; 