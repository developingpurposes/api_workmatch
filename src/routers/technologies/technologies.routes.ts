import { Router } from "express";
import { createdTechnologiesController } from "../../controllers/technologies/createdTechnologies.controller";
import { listAllTechnologiesController } from "../../controllers/technologies/listAllTechnologies.controller";
import { updateTechnologiesController } from "../../controllers/technologies/updateTechnologies.controller";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminMiddleware } from "../../middlewares/ensureIsAdmin.middleware";
import { ensureTechnologyIdIsValidMiddleware } from "../../middlewares/ensureTechnologyIdIsValid.middleware";
import { ensureTechnologyIsExistMiddleware } from "../../middlewares/ensureTechnologyIsExist.middleware";
import { ensureAuthMiddleware } from "../../middlewares/esureAuth.middleware";
import { createdSerializerTechnologies, updateSerializerTechnologies } from "../../serializers/technologies/technologies.serializer";

export const techlogiesRoutes = Router()


techlogiesRoutes.post("",
     ensureAuthMiddleware,
     ensureIsAdminMiddleware,
     ensureDataIsValidMiddleware(createdSerializerTechnologies),
     ensureTechnologyIsExistMiddleware,
     createdTechnologiesController
)


techlogiesRoutes.get("",
     ensureAuthMiddleware,
     listAllTechnologiesController
)


techlogiesRoutes.patch("/:id",
     ensureAuthMiddleware,
     ensureTechnologyIdIsValidMiddleware,
     ensureDataIsValidMiddleware(updateSerializerTechnologies),
     ensureTechnologyIsExistMiddleware,
     updateTechnologiesController
)


techlogiesRoutes.delete("/:id", (req, res) => res.status(201).json('deu certo rota delete') )
