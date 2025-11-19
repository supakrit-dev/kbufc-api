import { NextFunction, Response } from "express";
import db from "../config/db";
import logger from "../utils/logger";


export const resolveUserByUserId = async (req: any, res: Response, next: NextFunction) => {
    const { params: { id } } = req;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Missing user ID in request parameters.'
        });
    }

    try {
        const user = await db.user.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                username: true,
                status: true,
                role: true,
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User with ID ${id} not found.`
            });
        }

        req.user = user
        next();
    } catch (error) {
        logger.info(`Internal server error while retrieving user data`, {
            userId: req.user.id,
            ip: req.ip
        });
        return res.status(500).json({
            success: false,
            message: 'Internal server error while retrieving user data.'
        });
    }
}