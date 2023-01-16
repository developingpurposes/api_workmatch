import { Router } from "express";
import { createTechnologiesController } from "../../controllers/technologies/createdTechnologies.controller";
import { deleteTechnologiesController } from "../../controllers/technologies/deleteTechnologies.controller";
import { listAllTechnologiesController } from "../../controllers/technologies/listAllTechnologies.controller";
import { updateTechnologiesController } from "../../controllers/technologies/updateTechnologies.controller";
import { Technologies } from "../../entities/technologies.entity";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { ensureIdIsValidMiddleware } from "../../middlewares/ensureIdIsValid.middleware";
import { ensureIsAdminMiddleware } from "../../middlewares/ensureIsAdmin.middleware";
import { ensureTechnologyIsExistMiddleware } from "../../middlewares/ensureTechnologyIsExist.middleware";
import { ensureAuthMiddleware } from "../../middlewares/esureAuth.middleware";
import {
  createdSerializerTechnologies,
  updateSerializerTechnologies,
} from "../../serializers/technologies/technologies.serializer";

export const technologiesRoutes = Router();

technologiesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdminMiddleware,
  ensureDataIsValidMiddleware(createdSerializerTechnologies),
  ensureTechnologyIsExistMiddleware,
  createTechnologiesController
);

technologiesRoutes.get("", ensureAuthMiddleware, listAllTechnologiesController);

technologiesRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdminMiddleware,
  ensureIdIsValidMiddleware(Technologies),
  ensureDataIsValidMiddleware(updateSerializerTechnologies),
  ensureTechnologyIsExistMiddleware,
  updateTechnologiesController
);

technologiesRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdminMiddleware,
  ensureIdIsValidMiddleware(Technologies),
  deleteTechnologiesController
);
