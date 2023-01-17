import { Router } from "express";
import { ensureIsAdminMiddleware } from "../../middlewares/ensureIsAdmin.middleware";
import { ensureUpdateDataIsRightMiddleware } from "../../middlewares/ensureUpdateDataIsRight.middleware";
import { ensureAuthMiddleware } from "../../middlewares/esureAuth.middleware";
import { createUserController } from "../../controllers/users/createUser.controller";
import { listUsersController } from "../../controllers/users/listUsers.controller";
import { getUserController } from "../../controllers/users/getUser.controller";
import { patchUserController } from "../../controllers/users/patchUser.controller";
import { deleteUserController } from "../../controllers/users/deleteUser.controller";
import { ensureDataIsValidMiddleware, ensureDataIsValidUserForgotPasswordMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { updateSerializerProjects } from "../../serializers/projects/projects.serializer";
import { ensureTechnologyMiddleware } from "../../middlewares/ensureTechnology.middleware";
import {
  responseUserSerializer,
  updatedUserSerializer,
  userForgotPasswordSerializer,
} from "../../serializers/users/users.serializers";
import { Users } from "../../entities/users.entity";
import { ensureIdIsValidMiddleware } from "../../middlewares/ensureIdIsValid.middleware";
import { userForgotPasswordController } from "../../controllers/users/userForgotPassword.controller";
import { userResetPasswordController } from "../../controllers/users/userResetPassword.controller";

export const userRoutes = Router();

userRoutes.post(
  "",
  ensureTechnologyMiddleware(responseUserSerializer),
  createUserController
);

userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdminMiddleware,
  ensureTechnologyMiddleware(responseUserSerializer),
  listUsersController
);

userRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureIdIsValidMiddleware(Users),
  getUserController
);

userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIdIsValidMiddleware(Users),
  ensureUpdateDataIsRightMiddleware,
  ensureIsAdminMiddleware,
  ensureDataIsValidMiddleware(updatedUserSerializer),
  patchUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdminMiddleware,
  ensureIdIsValidMiddleware(Users),
  deleteUserController
);

userRoutes.post(
  "/forgotpassword",
  ensureDataIsValidUserForgotPasswordMiddleware(userForgotPasswordSerializer),
  userForgotPasswordController
);

userRoutes.get(
  "/resetpassword/:token",
  userResetPasswordController
)