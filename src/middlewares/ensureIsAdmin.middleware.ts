import { Request, Response, NextFunction } from "express";
import AppDataSource  from "../../src/data-source"
import { Users } from "../../src/entities/users.entity"

export const ensureIsAdminMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const userRepository = AppDataSource.getRepository(Users)

    const userToChange = await userRepository.findOneBy({
        id: req.params.id
    })
    
    const userLogged = await userRepository.findOneBy({
        id: String(req.user.id)
    })

    if(userLogged != userToChange && !userLogged.isAdm){
        return res.status(403).json({
            message: "missing admin permissions"
        })
    }

    return next()
}

