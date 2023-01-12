import dataSource from "../../data-source";
import { Technologies } from "../../entities/technologies.entity";
import { ITechnologyReturn } from "../../interfaces/technologies/technologies.interface";

export const listAllTechnologiesService = async (): Promise<
  ITechnologyReturn[]
> => {
  const technologiesRepository = dataSource.getRepository(Technologies);

  const listAllTechnologies = await technologiesRepository.find();

  return listAllTechnologies;
};
