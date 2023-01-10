import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Projects_queue } from "./projects_queue";
import { Projects_technologies } from "./projects_technologies";
import { Users } from "./users.entity";

@Entity("projects")
export class Projects {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100, nullable: true })
  imgUrl: string;

  @Column({ length: 300, nullable: true })
  description: string;

  @Column()
  maxTeamSize: number;

  @Column({default: true})
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Users, (user) => user.projects)
  user: Users;

  @OneToMany(() => Projects_queue, (userProjects) => userProjects.projects)
  userProjects: Projects_queue[]

  @OneToMany(() => Projects_technologies, (userProjects) => userProjects.technologies)
  projectTech: Projects_technologies[]

}
