import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Projects_queue } from "./projects_queue";
import { Projects_technologies } from "./projects_technologies";
import { Users } from "./users.entity";

@Entity("projects")
export class Projects {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  maxTeamSize: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Users, (user) => user.projects)
  ownerId: Users;

  @OneToMany(() => Projects_queue, (userProjects) => userProjects.projects)
<<<<<<< HEAD
  userProjects: Projects_queue[];

  @OneToMany(() => Projects_technologies, (projectTech) => projectTech.projects)
=======
  participants: Projects_queue[];

  @OneToMany(
    () => Projects_technologies,
    (userProjects) => userProjects.technologies
  )
>>>>>>> 4a60a9cc2130b4a2e488b11c9866192a3f428b38
  projectTech: Projects_technologies[];
}
