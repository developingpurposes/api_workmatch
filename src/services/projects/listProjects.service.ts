import dataSource from "../../data-source";
import { Projects } from "../../entities/projects.entity";

export const listsProjectsServices = async (): Promise<Projects[]> => {
  const projects = await dataSource
    .createQueryBuilder()
    .from(Projects, "projects")
    .leftJoin("projects.user", "user")
    .select([
      "projects",
      "user.id",
      "user.email",
      "user.username",
      "user.level",
      "user.avatarUrl",
      "user.contact",
    ])
    .leftJoinAndSelect("projects.projectTech", "projectTech")
    .leftJoinAndSelect("projectTech.technologies", "technologies")
    .getMany();

  return projects;
};
