import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Projects } from "./projects.entity";
import { Technologies } from "./technologies.entity";

@Entity("projects_technologies")
export class Projects_technologies {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Projects, (projects) => projects.projectTechs)
  projects: Projects;

  @ManyToOne(() => Technologies, (technologies) => technologies.projectTechs)
  technologies: Technologies;
}
