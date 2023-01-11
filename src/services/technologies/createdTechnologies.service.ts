import { Technologies } from "../../entities/technologies.entity";
import dataSource from "../../data-source";
import { ICreatedTechnology, ITechnologyReturn } from "../../interfaces/technologies";


export const createdTechnologiesService = async (technologiesData:ICreatedTechnology):Promise<ITechnologyReturn> => {
     
     const techlogiesRepository = dataSource.getRepository(Technologies)

     const createdTechlogie = techlogiesRepository.create(technologiesData)
     await techlogiesRepository.save(createdTechlogie)


     return createdTechlogie
}