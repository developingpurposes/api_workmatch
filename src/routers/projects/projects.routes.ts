import { Router } from "express";
import { createProjectsController } from "../../controllers/projects/createProject.controller";
import { deleteProjectsController } from "../../controllers/projects/deleteProject.controller";
import { joinProjectConfirmController } from "../../controllers/projects/joinProjectConfirmController";
import { joinQueueProjectsController } from "../../controllers/projects/joinQueueProjects.controller";
import { listsProjectsController } from "../../controllers/projects/listProject.controller";
import { listUserProjectsController } from "../../controllers/projects/listUserProjects.controller";
import { updateProjectsController } from "../../controllers/projects/updateProjects.controller";
import { Projects } from "../../entities/projects.entity";
import { Projects_queue } from "../../entities/projects_queue";
import { Users } from "../../entities/users.entity";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { ensureIdIsValidMiddleware } from "../../middlewares/ensureIdIsValid.middleware";
import { ensureIsAdminMiddleware } from "../../middlewares/ensureIsAdmin.middleware";
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

projectsRoutes.post(
  "/joinqueue/:id",
  ensureAuthMiddleware,
  ensureIdIsValidMiddleware(Projects),
  joinQueueProjectsController
);

projectsRoutes.post(
  "/confirmuser/:id",
  ensureAuthMiddleware,
  ensureIdIsValidMiddleware(Users),
  joinProjectConfirmController
);

projectsRoutes.get("", ensureAuthMiddleware, listsProjectsController);

projectsRoutes.get(
  "/user/:id",
  ensureAuthMiddleware,
  ensureIdIsValidMiddleware(Users),
  listUserProjectsController
);

projectsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(updateSerializerProjects),
  ensureIdIsValidMiddleware(Projects),
  ensureIsOwnerMiddleware,
  updateProjectsController
);

projectsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIdIsValidMiddleware(Projects),
  ensureIsAdminMiddleware,
  deleteProjectsController
);
