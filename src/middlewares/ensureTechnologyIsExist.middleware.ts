import { NextFunction, Request, Response } from "express";
import dataSource from "../data-source";
import { Technologies } from "../entities/technologies.entity";


export const ensureTechnologyIsExistMiddleware = async (request: Request, response: Response, next: NextFunction) => {
     
     const techlogiesRepository = dataSource.getRepository(Technologies)

     const techlogiesExist = await techlogiesRepository.findOne({ where: { name: request.body.name } })
     
     if (techlogiesExist) {
          return response.status(409).json({ menssage: "technology already exists" })
     }

     return next()
}