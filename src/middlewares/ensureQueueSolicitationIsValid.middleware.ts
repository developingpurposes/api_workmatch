import { AppError } from "../errors/appError"
import { Request, Response, NextFunction } from "express";
import AppDataSource  from "../data-source"
import { Projects_queue } from "../entities/projects_queue";
import { Projects } from "../entities/projects.entity";

export const ensureQueueSolicitationIsValidMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const queueData = req.body
    const queueRepository = AppDataSource.getRepository(Projects_queue)
    const projectRepository = AppDataSource.getRepository(Projects)

    const queueProject = await queueRepository.findOneBy({
        projects: queueData.projectId,
        user: queueData.userId
    })

    if(queueProject){
        throw new AppError("This solicitation was already send", 401)
    }

        
    const project = await projectRepository.findOneBy({
        id: queueData.projectId
    })
        
     if(project.isActive == false){
        throw new AppError("You can't participate on inactive projects", 401)
    }



    return next()
}
