import dataSource from "../../data-source";
import { Technologies } from "../../entities/technologies.entity";
import { ITechnologyRequest } from "../../interfaces/technologies/technologies.interface";

export const listAllTechnologiesService = async (): Promise<
  ITechnologyRequest[]
> => {
  const technologiesRepository = dataSource.getRepository(Technologies);

  const listAllTechnologies = await technologiesRepository.find();

  return listAllTechnologies;
};
