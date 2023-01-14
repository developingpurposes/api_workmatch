import { Router } from "express";
import { createTechnologiesController } from "../../controllers/technologies/createdTechnologies.controller";
import { deleteTechnologiesController } from "../../controllers/technologies/deleteTechnologies.controller";
import { listAllTechnologiesController } from "../../controllers/technologies/listAllTechnologies.controller";
import { updateTechnologiesController } from "../../controllers/technologies/updateTechnologies.controller";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminMiddleware } from "../../middlewares/ensureIsAdmin.middleware";
import { ensureTechnologyIdIsValidMiddleware } from "../../middlewares/ensureTechnologyIdIsValid.middleware";
import { ensureTechnologyIsExistMiddleware } from "../../middlewares/ensureTechnologyIsExist.middleware";
import { ensureAuthMiddleware } from "../../middlewares/esureAuth.middleware";
import { createdSerializerTechnologies, updateSerializerTechnologies } from "../../serializers/technologies/technologies.serializer";

export const technologiesRoutes = Router()


technologiesRoutes.post("",
     ensureAuthMiddleware,
     ensureIsAdminMiddleware,
     ensureDataIsValidMiddleware(createdSerializerTechnologies),
     ensureTechnologyIsExistMiddleware,
     createTechnologiesController
)


technologiesRoutes.get("",
     ensureAuthMiddleware,
     listAllTechnologiesController
)


technologiesRoutes.patch("/:id",
     ensureAuthMiddleware,
     ensureIsAdminMiddleware,
     ensureTechnologyIdIsValidMiddleware,
     ensureDataIsValidMiddleware(updateSerializerTechnologies),
     ensureTechnologyIsExistMiddleware,
     updateTechnologiesController
)


technologiesRoutes.delete("/:id",
     ensureAuthMiddleware,
     ensureIsAdminMiddleware,
     ensureTechnologyIdIsValidMiddleware,
     deleteTechnologiesController
)
