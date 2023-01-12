import { Request, Response } from "express";
import { listAllTechnologiesService } from "../../services/technologies/listAllTechnologies.service";


export const listAllTechnologiesController = async (request:Request , response:Response) => {
     const allListTechnologies = await listAllTechnologiesService()

     return response.status(200).json(allListTechnologies)
}