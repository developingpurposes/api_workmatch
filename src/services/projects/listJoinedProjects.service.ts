import dataSource from "../../data-source";
import { Projects_queue } from "../../entities/projects_queue";
import { AppError } from "../../errors/appError";
import {
  IJoinedProject,
  IJoinedProjectResponse
} from "../../interfaces/projects/projects.interface";
import { listSerializerJoinedProjects } from "../../serializers/projects/projects.serializer";

export const listJoinedProjectsService = async (
  limit: number,
  page: number,
  userId: string
): Promise<IJoinedProjectResponse> => {
  const count = await dataSource
    .createQueryBuilder(Projects_queue, "projectsQueue")
    .select("COUNT(projectsQueue.id)")
    .leftJoinAndSelect("projectsQueue.user", "user")
    .where("user.id = :id", { id: userId })
    .where("projectsQueue.isConfirmed = :isConfirmed",  { isConfirmed: true })
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
      : `https://backend-workmatch.onrender.com/projects/joinedprojects?page=${validatedPage + 1}`;

  let previousPage: string =
    skip * limit <= 1
      ? null
      : `https://backend-workmatch.onrender.com/projects/joinedprojects?page=${validatedPage - 1}`;

      const projects = await dataSource
      .createQueryBuilder()
      .from(Projects_queue, "projectsQueue")
      .select("projectsQueue")
      .leftJoinAndSelect("projectsQueue.user", "user")
      .leftJoinAndSelect("projectsQueue.projects", "projects")
      .leftJoinAndSelect("projects.owner", "owner")
      .leftJoinAndSelect("projects.projectTechs", "projectTechs")
      .leftJoinAndSelect("projectTechs.technologies", "technologies")
      .where("user.id = :id", { id: userId })
      .where("projectsQueue.isConfirmed = :isConfirmed",  { isConfirmed: true })
      .getMany();

  const validatedData: IJoinedProject[] = await listSerializerJoinedProjects.validate(
    projects,
    {
      abortEarly: false,
      stripUnknown: true,
    }
  );

  const projectResponse = {
    nextPage: nextPage,
    previousPage: previousPage,
    totalPages: totalPages,
    userProjects: validatedData,
  };

  return projectResponse;
};