import { Technologies } from "../../entities/technologies.entity";
import dataSource from "../../data-source";
import {
  ICreatedTechnology,
  ITechnologyReturn,
} from "../../interfaces/technologies/technologies.interface";

export const createTechnologiesService = async (
  technologiesData: ICreatedTechnology
): Promise<ITechnologyReturn> => {
  const technologiesRepository = dataSource.getRepository(Technologies);

  const createTechnologies = technologiesRepository.create(technologiesData);
  await technologiesRepository.save(createTechnologies);

  return createTechnologies;
};
