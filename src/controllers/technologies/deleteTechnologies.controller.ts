import { Request, Response } from "express";
import { deleteTechnologiesService } from "../../services/technologies/deleteTechnologies.service";


export const deleteTechnologiesController = async (request:Request, response:Response) => {
     const idTechnology = request.params.id
     const data = await deleteTechnologiesService(idTechnology)

     return response.status(204).json(data)
}