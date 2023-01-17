import { AppError } from "../errors/appError"
import { Request, Response, NextFunction } from "express";
import AppDataSource  from "../data-source"
import { Technologies } from "../entities/technologies.entity";

export const ensureUpdateDataIsRightMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const userData = req.body
    const { technology } = req.body
    const user = req.params.id
    
    const technologyRepository = AppDataSource.getRepository(Technologies);

    const combinationExists = await technologyRepository.
    createQueryBuilder("technologies").
    innerJoinAndSelect("technologies.userTechs", "users_technologies").
    innerJoinAndSelect("users_technologies.user", "users").
    where("users_technologies.user = :user", {user: user}).
    where("users_technologies.technology = :technology", {technology: technology}).
    getOne() 

    if (combinationExists) {
        throw new AppError("This technology was already assigned to this user", 409);
    }

    if(userData.id){
        throw new AppError("id update not authorized", 401)
    }

    if(userData.isActive !== undefined){
        throw new AppError("isActive update not authorized", 401)
    }

    if(userData.isAdm !== undefined){
        throw new AppError("isAdm update not authorized", 401)
    }

    return next()
}

