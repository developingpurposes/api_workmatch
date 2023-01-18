import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Technologies } from "./technologies.entity";
import { Users } from "./users.entity";

@Entity("users_technologies")
export class Users_technologies {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Users, (user) => user.userTechs, {
    onDelete: "CASCADE",
  })
  user: Users;

  @ManyToOne(() => Technologies, (technologies) => technologies.userTechs, {
    onDelete: "CASCADE",
  })
  technologies: Technologies;
}
