import dataSource from "../../data-source";
import { Projects } from "../../entities/projects.entity";
import { Projects_queue } from "../../entities/projects_queue";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";

export const joinQueueProjectsServices = async (
  projectId: string,
  userId: string
): Promise<string> => {
  const projectQueueRepository = dataSource.getRepository(Projects_queue);

  const userRepository = dataSource.getRepository(Users);

  const projectRepository = dataSource.getRepository(Projects);

  const userSearch = await dataSource
    .createQueryBuilder()
    .from(Projects_queue, "projectQueue")
    .select("projectQueue")
    .leftJoinAndSelect("projectQueue.projects", "projects")
    .leftJoinAndSelect("projectQueue.user", "user")
    .where("user.id = :id", { id: userId })
    .where("projects.id = :id", { id: projectId })
    .getMany();

  if (userSearch.length) {
    throw new AppError("User already joined in the queue!", 409);
  }

  const findUser = await projectRepository.findOne({
    where: { id: projectId },
    relations: {
      owner: true,
    },
  });


  if (findUser.owner.id == userId) {
    throw new AppError("You can't join on your own project", 409);
  }

  const userExist = await userRepository.findOne({
    where: { id: userId },
  });

  if (!userExist) {
    throw new AppError("User invalid!", 404);
  }

  const projectSearch = await projectRepository.findOne({
    where: {
      id: projectId,
    },
  });

  if (!projectSearch) {
    throw new AppError("projects is not found!", 404);
  }

  const projectQueueResponse = projectQueueRepository.create({});

  await projectQueueRepository.save(projectQueueResponse);

  await projectQueueRepository.update(
    { id: projectQueueResponse.id },
    {
      projects: projectSearch,
      user: userExist,
    }
  );
  return "You joined in this project waiting list";
};
