import { Projects } from "../../entities/projects.entity";
import dataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { In } from "typeorm";
import { IProjectUpdate } from "../../interfaces/projects/projects.interface";
import { Projects_technologies } from "../../entities/projects_technologies";
import { Technologies } from "../../entities/technologies.entity";

export const updateProjectsServices = async (
  newProject: IProjectUpdate,
  projectId: string
): Promise<Projects> => {
  let technologiesIds = newProject.technologies;

  if (technologiesIds == undefined) {
    technologiesIds = [];
  }

  const projectRepository = dataSource.getRepository(Projects);

  const projectTechsRepository = dataSource.getRepository(
    Projects_technologies
  );

  const technologyRepository = dataSource.getRepository(Technologies);

  const projectResponse = await projectRepository.find({
    withDeleted: true,
    where: { id: projectId },
  });

  if (!projectResponse.length) {
    throw new AppError("Updating projects is not allowed", 404);
  }

  if (!Object.keys(newProject).length) {
    throw new AppError("Updating projects is not allowed", 401);
  }

  delete newProject.technologies;

  const updateProject = projectRepository.create({
    ...projectResponse[0],
    ...newProject,
  });

  await projectRepository.save(updateProject);

  if (technologiesIds.length) {
    const techsSeach = await technologyRepository.find({
      where: {
        id: In(technologiesIds),
      },
    });

    if (!techsSeach.length) {
      throw new AppError("Technologies is not found!", 404);
    }

    await projectTechsRepository
      .createQueryBuilder()
      .delete()
      .where({ project: projectId })
      .execute();

    techsSeach.forEach(async (newTechlogy) => {
      const projectTechsResponse = projectTechsRepository.create({});

      await projectTechsRepository.save(projectTechsResponse);

      await projectTechsRepository.update(
        { id: projectTechsResponse.id },
        {
          projects: projectResponse[0],
          technologies: newTechlogy,
        }
      );
    });
  }

  return updateProject;
};
