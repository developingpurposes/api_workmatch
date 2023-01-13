import { Router } from "express";
import { createProjectsController } from "../../controllers/projects/createProject.controller";
import { deleteProjectsController } from "../../controllers/projects/deleteProject.controller";
import { listsProjectsController } from "../../controllers/projects/listProject.controller";
import { updateProjectsController } from "../../controllers/projects/updateProjects.controller";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { ensureIsOwnerMiddleware } from "../../middlewares/ensureIsOwner.middleware";
import { ensureAuthMiddleware } from "../../middlewares/esureAuth.middleware";
import {
  createdSerializerProjects,
  updateSerializerProjects,
} from "../../serializers/projects/projects.serializer";

export const projectsRoutes = Router();

projectsRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(createdSerializerProjects),
  createProjectsController
);

projectsRoutes.get("", ensureAuthMiddleware, listsProjectsController);

projectsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(updateSerializerProjects),
  ensureIsOwnerMiddleware,
  updateProjectsController
);

projectsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsOwnerMiddleware,
  deleteProjectsController
);
