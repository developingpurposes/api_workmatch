import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Projects_technologies } from "./projects_technologies";
import { Users_technologies } from "./users_technologies.entity";

@Entity("technologies")
export class Technologies {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  icon: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Users_technologies, (userTechs) => userTechs.technologies)
  userTechs: Users_technologies[];

  @OneToMany(
    () => Projects_technologies,
    (projectTechs) => projectTechs.technologies
  )
  projectTechs: Projects_technologies[];
}
