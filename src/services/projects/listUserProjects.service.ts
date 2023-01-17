import dataSource from "../../data-source";
import { Projects } from "../../entities/projects.entity";
import { AppError } from "../../errors/appError";
import {
  IProject,
  IProjectResponse,
} from "../../interfaces/projects/projects.interface";
import { listSerializerProjects } from "../../serializers/projects/projects.serializer";

export const listUserProjectsServices = async (
  limit: number,
  page: number,
  ownerId: string
): Promise<IProjectResponse> => {
  const count = await dataSource
    .createQueryBuilder(Projects, "projects")
    .select("COUNT(projects.id)")
    .where("projects.ownerId = :ownerId", { ownerId: ownerId })
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
    .from(Projects, "projects")
    .leftJoin("projects.owner", "owner")
    .select(["projects", "owner"])
    .leftJoinAndSelect("projects.projectTechs", "projectTechs")
    .leftJoinAndSelect("projectTechs.technologies", "technologies")
    .where("projects.owner = :owner", { owner: ownerId })
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
