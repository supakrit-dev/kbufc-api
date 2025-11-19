import { Router } from "express";
import adminRouter from "./admin";
import authRouter from "./auth";

const router = Router();

router.use("/api/admin", adminRouter)
router.use("/api/auth", authRouter)


export default router