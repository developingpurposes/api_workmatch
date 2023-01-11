import { AppError } from "../errors/appError"
import { Request, Response, NextFunction } from "express";

export const ensureUpdateDataIsRightMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const userData = req.body

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

