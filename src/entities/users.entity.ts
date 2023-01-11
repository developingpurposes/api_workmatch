import { hashSync } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Projects } from "./projects.entity";
import { Projects_queue } from "./projects_queue";
import { Users_technologies } from "./users_technologies.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 50, nullable: true })
  avatarUrl: string;

  @Column({ length: 300, nullable: true })
  bio: string;

  @Column({ length: 30, nullable: true })
  level: string;

  @Column({ length: 100, nullable: true })
  contact: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  isAdm: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => Projects, (project)=> project.user)
  projects: Projects[]

  @OneToMany(()=> Users_technologies, (userTechs) => userTechs.user)
  userTechs: Users_technologies[]

  @OneToMany(()=> Projects_queue, (userProjects) => userProjects.user)
  userProjects: Projects_queue[]
}
