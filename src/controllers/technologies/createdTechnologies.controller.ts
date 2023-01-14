import { Request,Response } from "express";
import { createTechnologiesService } from "../../services/technologies/createTechnologies.service";


export const createTechnologiesController = async (request:Request , response:Response) => {
     const technologiesData = request.body

     const technologiesCreated = await createTechnologiesService(technologiesData)
     
     return response.status(201).json(technologiesCreated)
}