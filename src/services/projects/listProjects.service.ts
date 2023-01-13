import dataSource from "../../data-source";
import { Projects } from "../../entities/projects.entity";

export const listsProjectsServices = async (): Promise<Projects[]> => {
  const projects = await dataSource
    .createQueryBuilder()
    .from(Projects, "projects")
    .leftJoin("projects.owner", "owner")
    .select([
      "projects",
      "owner.id",
      "owner.email",
      "owner.username",
      "owner.level",
      "owner.avatarUrl",
      "owner.contact",
    ])
    .leftJoinAndSelect("projects.projectTechs", "projectTechs")
    .leftJoinAndSelect("projectTechs.technologies", "technologies")
    .getMany();

  return projects;
};
