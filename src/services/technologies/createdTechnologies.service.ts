import { Technologies } from "../../entities/technologies.entity";
import { AppError } from "../../errors/appError";
import dataSource from "../../data-source";
import { ICreatedTechnology, ITechnologyReturn } from "../../interfaces/technologies";


export const createdTechnologiesService = async (technologiesData:ICreatedTechnology):Promise<ITechnologyReturn> => {
     
     const techlogiesRepository = dataSource.getRepository(Technologies)

     const techlogiesExist = await techlogiesRepository.findOne({where: {name:technologiesData.name}})
     console.log(techlogiesExist)
     
     if (techlogiesExist) {
          throw new AppError("technology already exists", 409)
     }

     const createdTechlogie = techlogiesRepository.create(technologiesData)
     await techlogiesRepository.save(createdTechlogie)


     return createdTechlogie
}