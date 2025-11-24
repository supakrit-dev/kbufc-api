import { Router } from "express";
import { checkSchema } from "express-validator";
import { createUserHandler, deleteUserHandler, getUserByIdHandler, getUsersHandler, updateUserHandler } from "../../../handler/user";
import { checkDuplicateUsername, resolveUserByUserId } from "../../../middleware/userMiddleware";
import { createUserValidationSchemas } from "../../../validators/user.validators";

const router = Router();

//Get User
router.get('/', getUsersHandler);

//Create User
router.post('/', checkSchema(createUserValidationSchemas), checkDuplicateUsername, createUserHandler);

//Get User by Id
router.get('/:id', resolveUserByUserId, getUserByIdHandler);

//Delete User by Id
router.delete('/:id', resolveUserByUserId, deleteUserHandler);

//Update User
router.patch('/:id', resolveUserByUserId, checkSchema(createUserValidationSchemas), checkDuplicateUsername, updateUserHandler);

export default router;