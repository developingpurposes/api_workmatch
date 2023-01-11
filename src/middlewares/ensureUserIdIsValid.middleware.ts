import { Request, Response, NextFunction } from "express";
import AppDataSource  from "../data-source"
import { Users } from "../../src/entities/users.entity"

export const ensureUserIdIsValidMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const userRepository = AppDataSource.getRepository(Users)

    const userId = await userRepository.findOneBy({
        id: req.params.id
    })

    if(!userId){
        return res.status(404).json({
            message: "id does not exist"
        })
    }

    return next()
}

