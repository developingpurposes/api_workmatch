import dataSource from "../../data-source"
import { Technologies } from "../../entities/technologies.entity"


export const deleteTechnologiesService = async (idTechnology: string) => {
     const technologiesRepository = dataSource.getRepository(Technologies)     
     
     await technologiesRepository.delete({ id: idTechnology })
    
     return {}
}