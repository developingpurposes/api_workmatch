import { Router } from "express";
import { createUserController } from "../../controllers/users/createUser.controller";
import { deleteUserController } from "../../controllers/users/deleteUser.controller";
import { getUserController } from "../../controllers/users/getUser.controller";
import { listUsersController } from "../../controllers/users/listUsers.controller";
import { patchUserController } from "../../controllers/users/patchUser.controller";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listUsersController);
userRoutes.get("/:id", getUserController);
userRoutes.patch("/:id", patchUserController);
userRoutes.delete("/:id", deleteUserController);
