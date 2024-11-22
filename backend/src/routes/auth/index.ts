import { Router } from "express";
import { createLoginScheme, createUserScheme, usersTable } from "../../db/usersSchema";
import { validateData } from "../../middlewares/validationMiddleware";
import bcrypt from 'bcryptjs'
import { db } from "../../db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken"
const router = Router()

//register
router.post("/register", validateData(createUserScheme), async (req, res) => {
    try {
        const data = req.cleanBody

        data.password = await bcrypt.hash(data.password, 10)

        const [user] = await db.insert(usersTable).values(data).returning()

        //@ts-ignore
        delete user.password

        res.status(201).json({ user })
        return
    } catch (e) {
        res.status(500).json({ error: true, message: "something went wrong" })
        return
    }

})

//login
router.post("/login", validateData(createLoginScheme), async (req, res) => {
    try {
        const { email, password } = req.cleanBody
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email))

        if (!user) {
            res.status(401).json({ error: "Authentication failed" })
            return
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            res.status(401).json({ error: "Authentication failed" })
            return
        }

        //@ts-ignore
        delete user.password
        //create users jwt token
        const token = jwt.sign({ userId: user.id, role: user.role }, "process.env.JWT_SECRET", { expiresIn: '30d' })
        res.status(200).json({ user, token })
        return
    } catch (error) {
        res.status(500)
    }
})


export default router;