import dataSource from "../../data-source";
import { Projects } from "../../entities/projects.entity";
import { AppError } from "../../errors/appError";

export const deleteProjectsServices = async (projectId: string) => {
  const projectRepository = dataSource.getRepository(Projects);

  const projectResponse = await projectRepository.findOne({
    where: { id: projectId },
    withDeleted: true,
  });

  if (!projectResponse.isActive) {
    throw new AppError("This project already deleted!", 403);
  }

  if (!projectResponse) {
    throw new AppError("Deleting projects is not allowed!", 404);
  }

  await projectRepository.softRemove(projectResponse);

  await projectRepository.save({ ...projectResponse, isActive: false });
};
