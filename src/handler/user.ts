import { Request, Response } from "express";

export const getUserByIdHandler = (req: Request, res: Response) => {
    const { user } = req;
    
    return res.status(200).json({
        success: true,
        data: user
    })

}