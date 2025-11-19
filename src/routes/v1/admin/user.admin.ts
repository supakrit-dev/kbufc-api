import { Router } from "express";
import { getUserByIdHandler } from "../../../handler/user";
import { resolveUserByUserId } from "../../../middleware/resolveUser";

const router = Router();

router.get('/:id', resolveUserByUserId, getUserByIdHandler)

export default router;