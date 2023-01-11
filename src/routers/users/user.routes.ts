import { Router } from "express";
import { createUserController } from "../../controllers/users.controller";

export const userRoutes = Router();

userRoutes.post("", createUserController);
