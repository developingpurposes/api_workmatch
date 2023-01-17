import dataSource from "../../data-source";
import { Projects } from "../../entities/projects.entity";
import { Projects_queue } from "../../entities/projects_queue";
import {
  IProject,
  IProjectResponse,
} from "../../interfaces/projects/projects.interface";
import { listSerializerProjects } from "../../serializers/projects/projects.serializer";

export const listJoinedProjectsServices = async (
  limit: number,
  page: number,
  userId: string
): Promise<IProjectResponse> => {
  const count = await dataSource
    .createQueryBuilder(Projects, "projects")
    .select("COUNT(projects.id)")
    .where("projects.participantsId = :participantsId", { participantsId: userId })
    .getCount();

  const totalPages: number = Math.ceil(count / limit);

  const isNotPage = page >= 1 ? page : 1;

  const validatedPage = isNotPage > totalPages ? totalPages : isNotPage;

  const skip: number = validatedPage * limit - limit;

  let nextPage: string =
    totalPages <= validatedPage
      ? null
      : `http://localhost:3000/projects?page=${validatedPage + 1}`;

  let previousPage: string =
    skip * limit <= 1
      ? null
      : `http://localhost:3000/projects?page=${validatedPage - 1}`;

  const projects = await dataSource
    .createQueryBuilder()
    .from(Projects_queue, "projectsQueue")
    .leftJoin("projectsQueue.projects", "projects")
    .select(["projects", "participants"])
    .leftJoinAndSelect("projects.projectTechs", "projectTechs")
    .leftJoinAndSelect("projectTechs.technologies", "technologies")
    .where("projects.participants = :participants", { participants: userId})
    .orderBy("projects.createdAt", "DESC")
    .take(limit)
    .skip(skip)
    .getMany();

  const validatedData: IProject[] = await listSerializerProjects.validate(
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
    projects: validatedData,
  };

  return projectResponse;
};