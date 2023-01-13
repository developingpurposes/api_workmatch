import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  listUsersController,
  patchUserController,
} from "../controllers/users.controller";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureUpdateDataIsRightMiddleware } from "../middlewares/ensureUpdateDataIsRight.middleware";
import { ensureAuthMiddleware } from "../middlewares/esureAuth.middleware";
import {ensureUserIdIsValidMiddleware} from "../middlewares/ensureUserIdIsValid.middleware"

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", ensureAuthMiddleware, ensureIsAdminMiddleware, listUsersController);
userRoutes.get("/:id", ensureAuthMiddleware, ensureUserIdIsValidMiddleware, getUserController);
userRoutes.patch("/:id", ensureAuthMiddleware, ensureUpdateDataIsRightMiddleware, patchUserController);
userRoutes.delete("/:id", ensureAuthMiddleware, ensureIsAdminMiddleware, deleteUserController);
