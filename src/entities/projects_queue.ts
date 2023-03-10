import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Projects } from "./projects.entity";
import { Users } from "./users.entity";

@Entity("projects_queue")
export class Projects_queue {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  isConfirmed: boolean;

  @ManyToOne(() => Users, (user) => user.participants)
  user: Users;

  @ManyToOne(() => Projects, (projects) => projects.participants)
  projects: Projects;
}
