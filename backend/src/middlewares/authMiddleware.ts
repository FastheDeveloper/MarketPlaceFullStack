import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).json({ error: "Access Denied" })
        return
    }

    try {
        //decode jwt token
        const decoded = jwt.verify(token, "process.env.JWT_SECRET")
        if (typeof decoded !== 'object' || !decoded?.userId) {
            res.status(401).json({ error: "Access Denied" })
            return
        }
        req.userId = decoded.userId
        req.role = decoded.role
        next()
    } catch (error) {
        res.status(401).json({ error: "Access Denied" })

    }
}

export function verifyRoleIsSeller(req: Request, res: Response, next: NextFunction) {
    const role = req.role
    if (role !== "seller") {
        res.status(401).json({ error: "You cannot create product - Not a seller" })
        return
    }
    next()

}

export function verifyRoleIsAdmin(req: Request, res: Response, next: NextFunction) {
    const role = req.role
    if (role !== "admin") {
        res.status(401).json({ error: "You cannot access this. - Not an Admin" })
        return
    }
    next()

}