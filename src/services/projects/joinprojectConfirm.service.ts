import dataSource from "../../data-source";
import { Projects_queue } from "../../entities/projects_queue";
import { AppError } from "../../errors/appError";

export const queueConfirmService = async (
  ownerId: string,
  queueId: string
): Promise<string> => {
  const projectsQeueRepository = dataSource.getRepository(Projects_queue);

  const projectQueueSearch = await dataSource
    .createQueryBuilder()
    .from(Projects_queue, "projectsQueue")
    .select("projectsQueue")
    .leftJoinAndSelect("projectsQueue.projects", "projects")
    .leftJoinAndSelect("projects.owner", "owner")
    .leftJoinAndSelect("projectsQueue.user", "user")
    .where("projectsQueue.id = :id", { id: queueId })
    .withDeleted()
    .getOne();

  if (projectQueueSearch.projects.owner.id !== ownerId) {
    throw new AppError("You are not the owner of the project", 401);
  }

  if (projectQueueSearch.isConfirmed) {
    throw new AppError("You already confirmed on this project", 409);
  }

  await projectsQeueRepository.save({
    ...projectQueueSearch,
    isConfirmed: true,
  });

  return "You confirmed this user on the project";
};
