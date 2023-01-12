import { Request, Response } from "express";
import { updateTechnologiesService } from "../../services/technologies/updateTechnologies.service";


export const updateTechnologiesController = async (request:Request, response:Response) => {
     const updateDateTechnology = request.body 
     const idTechnology = request.params.id
     const updateTechnology = await updateTechnologiesService(updateDateTechnology,idTechnology)

     return response.status(201).json(updateTechnology)

}