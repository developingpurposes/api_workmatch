import { Request,Response } from "express";
import { createdTechnologiesService } from "../../services/technologies/createdTechnologies.service";


export const createdTechnologiesController = async (request:Request , response:Response) => {
     const technologiesData = request.body

     const techlogiesCreated = await createdTechnologiesService(technologiesData)
     
     return response.status(201).json(techlogiesCreated)
}