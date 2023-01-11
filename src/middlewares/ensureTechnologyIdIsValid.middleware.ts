import { Request, Response, NextFunction } from "express";
import AppDataSource  from "../data-source"
import { Technologies } from "../entities/technologies.entity";

export const ensureTechnologyIdIsValidMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const technologyRepository = AppDataSource.getRepository(Technologies)

        const technologyId = await technologyRepository.findOneBy({
            id: req.params.id
        })

        if(!technologyId){
            return res.status(404).json({
                message: "technology id does not exist"
            })
    }

return next()

}



