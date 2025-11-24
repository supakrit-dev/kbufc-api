import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import db from "../config/db";
import { hashPassword } from "../utils/helper";
import logger from "../utils/logger";

export const getUserByIdHandler = (req: Request, res: Response) => {
    const { user } = req;

    return res.status(200).json({
        success: true,
        data: user
    })

}

export const getUsersHandler = async (req: Request, res: Response) => {
    try {
        const users = await db.user.findMany()
        logger.info('Fetch Users')
        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        logger.info(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error while retrieving user data.'
        });
    }
}

export const createUserHandler = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ error: result.array() });

    const data = matchedData(req);
    data.password = hashPassword(data.password);

    try {
        await db.user.create({
            data: {
                username: data.username,
                password: data.password,
                status: data.status,
                role: data.role
            }
        });
        return res.status(201).json({
            success: true,
            message: "Create user success."
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Internal server error while creating user."
        });
    }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
    const { user } = req;
    try {
        await db.user.delete({
            where: { id: user?.id }
        })
        return res.status(200).json({
            success: true,
            message: "Delete user success."
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Internal server error while deleting user."
        });
    }
}

export const updateUserHandler = async (req: Request, res: Response) => {
    const result = validationResult(req);
    const id = req.user?.id

    if (!result.isEmpty()) return res.status(400).send({ error: result.array() });

    const data = matchedData(req);
    data.password = hashPassword(data.password);
    try {
        await db.user.update({
            where: { id },
            data: {
                username: data.username,
                password: data.password,
                status: data.status,
                role: data.role
            }
        });
        return res.status(200).json({
            success: true,
            message: "Updated user success."
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Internal server error while creating user."
        });
    }
}