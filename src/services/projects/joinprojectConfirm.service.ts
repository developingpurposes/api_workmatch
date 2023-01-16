import dataSource from "../../data-source";
import { Projects } from "../../entities/projects.entity";
import { Projects_queue } from "../../entities/projects_queue";
import { AppError } from "../../errors/appError";

export const joinProjectConfirmService = async (
  ownerId: string,
  userId: string
): Promise<string> => {
  const projectsQeueRepository = dataSource.getRepository(Projects_queue);

  const projectQueueSearch = await dataSource
    .createQueryBuilder()
    .from(Projects_queue, "projectsQueue")
    .select("projectsQueue")
    .leftJoinAndSelect("projectsQueue.projects", "projects")
    .leftJoinAndSelect("projects.owner", "owner")
    .leftJoinAndSelect("projectsQueue.user", "user")
    .where("user.id = :id", { id: userId })
    .withDeleted()
    .getOne();

  if (projectQueueSearch.projects.owner.id !== ownerId) {
    throw new AppError("You are not the owner of the project", 401);
  }


  await projectsQeueRepository.save({
    ...projectQueueSearch,
    isConfirmed: true,
  });
  return "You confirm this user on the project";
};
