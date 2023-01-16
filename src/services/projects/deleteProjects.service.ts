import dataSource from "../../data-source";
import { Projects } from "../../entities/projects.entity";
import { AppError } from "../../errors/appError";

export const deleteProjectsServices = async (projectId: string) => {
  const projectRepository = dataSource.getRepository(Projects);

  const projectResponse = await projectRepository.find({
    withDeleted: true,
    where: { id: projectId },
  });

  if (!projectResponse.length) {
    throw new AppError("Deleting projects is not allowed!", 404);
  }

  if (!projectResponse[0].isActive) {
    throw new AppError("This project already deleted!", 403);
  }

  await projectRepository.softRemove(projectResponse[0]);

  await projectRepository.save({ ...projectResponse[0], isActive: false });
};
