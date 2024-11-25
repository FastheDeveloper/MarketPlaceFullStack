import { Router } from "express"
// import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "./productsController.js"
import { validateData } from "../../middlewares/validationMiddleware.js"
import { createProductZodSchema, updateProductZodSchema } from "../../db/productsSchema.js"
import { verifyRoleIsSeller, verifyToken } from "../../middlewares/authMiddleware.js"
import { createOrder, deleteOrder, getOrderById, listOrders, updateOrderItems } from "./ordersController.js"
import { createOrderSchema, createOrderWithItemSchema, updateOrderSchema } from "../../db/ordersSchema.js"


const router = Router()

router.get('/', verifyToken, listOrders)
router.get('/:id', verifyToken, getOrderById)
router.post("/", verifyToken, validateData(createOrderWithItemSchema), createOrder)
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrderItems)
router.delete('/:id', verifyToken, deleteOrder)

export default router; 