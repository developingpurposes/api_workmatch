import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  patchUserController,
} from "../controllers/users.controller";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listUsersController);
userRoutes.patch("/:id", patchUserController);
userRoutes.delete("/:id", deleteUserController);
