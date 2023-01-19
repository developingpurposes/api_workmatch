import { Router } from "express";
import { ensureIsAdminMiddleware } from "../../middlewares/ensureIsAdmin.middleware";
import { ensureUpdateDataIsRightMiddleware } from "../../middlewares/ensureUpdateDataIsRight.middleware";
import { ensureAuthMiddleware } from "../../middlewares/esureAuth.middleware";
import { createUserController } from "../../controllers/users/createUser.controller";
import { listUsersController } from "../../controllers/users/listUsers.controller";
import { getUserController } from "../../controllers/users/getUser.controller";
import { patchUserController } from "../../controllers/users/patchUser.controller";
import { deleteUserController } from "../../controllers/users/deleteUser.controller";
import { updateSerializerProjects } from "../../serializers/projects/projects.serializer";
import { ensureTechnologyMiddleware } from "../../middlewares/ensureTechnology.middleware";
import {
  responseUserSerializer,
  updatedUserSerializer,
  userForgotPasswordSerializer,
  userSerializer,
} from "../../serializers/users/users.serializers";
import { Users } from "../../entities/users.entity";
import { ensureIdIsValidMiddleware } from "../../middlewares/ensureIdIsValid.middleware";
import { userForgotPasswordController } from "../../controllers/users/userForgotPassword.controller";
import { userResetPasswordController } from "../../controllers/users/userResetPassword.controller";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { profileUsersController } from "../../controllers/users/profileUser.controller";

export const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSerializer),
  ensureTechnologyMiddleware(responseUserSerializer),
  createUserController
);

userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureTechnologyMiddleware(responseUserSerializer),
  ensureIsAdminMiddleware,
  listUsersController
);

userRoutes.get(
  "/profile",
  ensureAuthMiddleware,
  ensureTechnologyMiddleware(responseUserSerializer),
  profileUsersController
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
  ensureDataIsValidMiddleware(userForgotPasswordSerializer),
  userForgotPasswordController
);

userRoutes.get("/resetpassword/:token", userResetPasswordController);
