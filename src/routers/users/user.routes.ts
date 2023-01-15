import { Router } from "express";
import { ensureIsAdminMiddleware } from "../../middlewares/ensureIsAdmin.middleware";
import { ensureUpdateDataIsRightMiddleware } from "../../middlewares/ensureUpdateDataIsRight.middleware";
import { ensureAuthMiddleware } from "../../middlewares/esureAuth.middleware";
import { ensureUserIdIsValidMiddleware } from "../../middlewares/ensureUserIdIsValid.middleware";
import { createUserController } from "../../controllers/users/createUser.controller";
import { listUsersController } from "../../controllers/users/listUsers.controller";
import { getUserController } from "../../controllers/users/getUser.controller";
import { patchUserController } from "../../controllers/users/patchUser.controller";
import { deleteUserController } from "../../controllers/users/deleteUser.controller";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { updateSerializerProjects } from "../../serializers/projects/projects.serializer";
import { ensureTechnologyMiddleware } from "../../middlewares/ensureTechnology.middleware";
import { responseUserSerializer } from "../../serializers/users/users.serializers";

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
  ensureUserIdIsValidMiddleware,
  getUserController
);

userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUpdateDataIsRightMiddleware,
  ensureUserIdIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureDataIsValidMiddleware(updateSerializerProjects),
  patchUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdminMiddleware,
  ensureUserIdIsValidMiddleware,
  deleteUserController
);
