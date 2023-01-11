import { Request, Response, NextFunction } from "express";
import AppDataSource  from "../data-source"
import { Projects_queue } from "../entities/projects_queue";

export const ensureQueueIdIsValidMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const queueRepository = AppDataSource.getRepository(Projects_queue)

    const queueId = await queueRepository.findOneBy({
        id: req.params.id
    })

    if(!queueId){
        return res.status(404).json({
            message: "id does not exist"
        })
    }

    return next()
}
