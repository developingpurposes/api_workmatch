import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  listUsersController,
  patchUserController,
} from "../controllers/users.controller";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listUsersController);
userRoutes.get("/:id", getUserController);
userRoutes.patch("/:id", patchUserController);
userRoutes.delete("/:id", deleteUserController);
