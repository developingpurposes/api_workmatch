import { Request, Response, NextFunction } from "express";
import AppDataSource  from "../data-source"
import { Projects } from "../entities/projects.entity";

export const ensureProjectIdIsValidMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const projectRepository = AppDataSource.getRepository(Projects)

        const projectId = await projectRepository.findOneBy({
            id: req.body.propertyId
        })

        if(!projectId){
            return res.status(404).json({
                message: "project id does not exist"
            })
        }

return next()

}

