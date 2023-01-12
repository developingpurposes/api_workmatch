import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  patchUserController,
} from "../controllers/users.controller";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureUpdateDataIsRightMiddleware } from "../middlewares/ensureUpdateDataIsRight.middleware";
import { ensureAuthMiddleware } from "../middlewares/esureAuth.middleware";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", ensureAuthMiddleware, ensureIsAdminMiddleware, listUsersController);
userRoutes.patch("/:id", ensureAuthMiddleware, ensureUpdateDataIsRightMiddleware, patchUserController);
userRoutes.delete("/:id", ensureAuthMiddleware, ensureIsAdminMiddleware, deleteUserController);
