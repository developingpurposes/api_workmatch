import { Router } from "express";
import { createSessionController } from "../../controllers/session/createSession.controllers";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { userLoginSerializer } from "../../serializers/users/users.serializers";

export const sessionRoutes = Router();

sessionRoutes.post(
  "",
  ensureDataIsValidMiddleware(userLoginSerializer),
  createSessionController
);
