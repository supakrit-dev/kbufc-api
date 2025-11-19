import { NextFunction, Request, Response } from "express";

declare module "express-serve-static-core" {
    interface User {
        id: string;
        username: string;
        role: 'ADMIN' | 'USER';
        status: 'AVTIVE' | 'INACTIVE';
    }

    interface Request {
        user?: User
    }
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).send({
            success: false,
            message: "Access denied. Please log in."
        })
    }
    if (req.user.role !== 'ADMIN') {
        return res.status(403).send({ success: false, message: "Access denied. Requires Admin role." });
    }
    next();
}

export const checkBanned = (req: Request, res: Response, next: NextFunction) => {
    if(req.user?.status === 'INACTIVE'){
        return res.status(403).send({
            success: false,
            message: "Your account has been permanently suspended and access is denied. Please contact support for more information."
        })
    }
    next();
}