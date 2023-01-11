import dataSource from "../../data-source";
import { Technologies } from "../../entities/technologies.entity";
import { ITechnologyReturn, IUpdateTechnology } from "../../interfaces/technologies";


export const updateTechnologiesService = async (updateDateTechnology:IUpdateTechnology , idTechnology:string):Promise<ITechnologyReturn> => {
     
     const technologiesRepository = dataSource.getRepository(Technologies)
     const technology = await technologiesRepository.findOneBy({
          id: idTechnology
     })


     const updateTechnology = technologiesRepository.create({
          ...technology,
          ...updateDateTechnology,
     })

     await technologiesRepository.save(updateTechnology)


     return updateTechnology
}