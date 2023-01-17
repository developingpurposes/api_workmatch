import { AppError } from "../errors/appError"
import { Request, Response, NextFunction } from "express";
import AppDataSource  from "../data-source"
import { Projects } from "../entities/projects.entity";

export const ensureUpdateDataIsRightMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const projectData = req.body
    const projectRepository = AppDataSource.getRepository(Projects)

    const projectName = await projectRepository.findOneBy({
        name: projectData.name
    })

    if(projectName){
        throw new AppError("Project name already exists", 401)
    }

    return next()
}

