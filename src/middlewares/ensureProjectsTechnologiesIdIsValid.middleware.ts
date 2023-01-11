import { Request, Response, NextFunction } from "express";
import AppDataSource  from "../data-source"
import { Projects_technologies } from "../entities/projects_technologies";

export const ensureProjectsTechnologiesIdIsValidMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const projectsTechnologiesRepository = AppDataSource.getRepository(Projects_technologies)

    const projectsTechnologiesId = await projectsTechnologiesRepository.findOneBy({
        id: req.params.projectsTechnologiesId
    })

    if(!projectsTechnologiesId){
        return res.status(404).json({
            message: "projectsTechnologiesId does not exist"
        })
    }

    return next()
}

