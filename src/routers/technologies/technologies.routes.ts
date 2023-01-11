import { Router } from "express";
import { createdTechnologiesController } from "../../controllers/technologies/createdTechnologies.controller";
import { listAllTechnologiesController } from "../../controllers/technologies/listAllTechnologies.controller";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminMiddleware } from "../../middlewares/ensureIsAdmin.middleware";
import { ensureAuthMiddleware } from "../../middlewares/esureAuth.middleware";
import { createdSerializerTechnologies } from "../../serializers/technologies/technologies.serializer";

export const techlogiesRoutes = Router()


techlogiesRoutes.post(
     "",
     ensureAuthMiddleware,
     ensureIsAdminMiddleware,
     ensureDataIsValidMiddleware(createdSerializerTechnologies),
     createdTechnologiesController
)


techlogiesRoutes.get(
     "",
     ensureAuthMiddleware,
     listAllTechnologiesController
)



techlogiesRoutes.patch("/:id",(req, res) => res.status(201).json('deu certo rota patch') )
techlogiesRoutes.delete("/:id", (req, res) => res.status(201).json('deu certo rota delete') )
