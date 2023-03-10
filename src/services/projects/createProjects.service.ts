import dataSource from "../../data-source";
import { Projects } from "../../entities/projects.entity";
import { Projects_technologies } from "../../entities/projects_technologies";
import { Technologies } from "../../entities/technologies.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { In } from "typeorm";
import { IProjectRequest } from "../../interfaces/projects/projects.interface";
import * as yup from "yup";

export const createProjectsServices = async (
  newProject: IProjectRequest
): Promise<Projects> => {
  const validatedId = yup.string().uuid("Id not found!");

  await validatedId.validate(newProject.ownerId);

  const technologiesIds = newProject.technologies;
  delete newProject.technologies;

  const userRepository = dataSource.getRepository(Users);

  const projectTechsRepository = dataSource.getRepository(
    Projects_technologies
  );

  const technologyRepository = dataSource.getRepository(Technologies);

  const userExist = await userRepository.findOne({
    where: { id: newProject.ownerId },
  });

  if (!userExist) {
    throw new AppError("User invalid!", 404);
  }

  const projectRepository = dataSource.getRepository(Projects);

  const techsSearch = await technologyRepository.find({
    where: {
      id: In(technologiesIds),
    },
  });

  if (!techsSearch.length) {
    throw new AppError("Technologies is not found!", 404);
  }

  const projectResponse = projectRepository.create(newProject);

  await projectRepository.save(projectResponse);

  await projectRepository.update(
    { id: projectResponse.id },
    {
      owner: userExist,
    }
  );

  techsSearch.forEach(async (newTechlogy) => {
    const projectTechsResponse = projectTechsRepository.create({});

    await projectTechsRepository.save(projectTechsResponse);

    await projectTechsRepository.update(
      { id: projectTechsResponse.id },
      {
        projects: projectResponse,
        technologies: newTechlogy,
      }
    );
  });

  const project = {
    ...projectResponse,
    ownerId: newProject.ownerId,
    technologies: techsSearch,
  };

  return project;
};
