import { Router } from "express";

import { requireAdmin } from "../../../middleware/adminMiddleware";
import usersRouter from "./user.admin";

const router = Router();

router.use(requireAdmin);

router.use("/users", usersRouter);

export default router;