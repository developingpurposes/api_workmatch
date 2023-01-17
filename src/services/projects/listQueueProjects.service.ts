import dataSource from "../../data-source";
import { Projects_queue } from "../../entities/projects_queue";
import { AppError } from "../../errors/appError";
import { IProjectQueue } from "../../interfaces/projects/projects.interface";
import { listSerializerProjectsQueue } from "../../serializers/projects/projects.serializer";

export const listQueueProjectsServices = async (
  limit: number,
  page: number,
  projectId: string
) => {
  const count = await dataSource
    .createQueryBuilder(Projects_queue, "projectsQueue")
    .leftJoinAndSelect("projectsQueue.projects", "projects")
    .leftJoinAndSelect("projectsQueue.user", "user")
    .select("COUNT(projectsQueue.id)")
    .where("projects.id = :id", { id: projectId })
    .where("projectsQueue.isConfirmed = :isConfirmed", { isConfirmed: false })
    .getCount();

  if (!count) {
    throw new AppError("empty list", 404);
  }

  const totalPages: number = Math.ceil(count / limit);

  const isNotPage = page >= 1 ? page : 1;

  const validatedPage = isNotPage > totalPages ? totalPages : isNotPage;

  const skip: number = Math.abs(validatedPage * limit - limit);

  let nextPage: string =
    totalPages <= validatedPage
      ? null
      : `https://backend-workmatch.onrender.com/projects?page=${
          validatedPage + 1
        }`;

  let previousPage: string =
    skip * limit <= 1
      ? null
      : `https://backend-workmatch.onrender.com/projects?page=${
          validatedPage - 1
        }`;

  const projects = await dataSource
    .createQueryBuilder()
    .from(Projects_queue, "projectsQueue")
    .select("projectsQueue")
    .leftJoinAndSelect("projectsQueue.projects", "projects")
    .leftJoinAndSelect("projectsQueue.user", "user")
    .leftJoinAndSelect("user.userTechs", "userTechs")
    .leftJoinAndSelect("userTechs.technologies", "technologies")
    .orderBy("projects.createdAt", "DESC")
    .where("projects.id = :id", { id: projectId })
    .where("projectsQueue.isConfirmed = :isConfirmed", { isConfirmed: false })
    .take(limit)
    .skip(skip)
    .getMany();

  const validatedData: IProjectQueue[] =
    await listSerializerProjectsQueue.validate(projects, {
      abortEarly: false,
      stripUnknown: true,
    });

  const projectQueueResponse = {
    nextPage: nextPage,
    previousPage: previousPage,
    totalPages: totalPages,
    listQueue: validatedData,
  };

  return projectQueueResponse;
};
