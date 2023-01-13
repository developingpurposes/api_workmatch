import dataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users/user.interface";

export const listUserService = async (): Promise<IUser[]> => {
  const users = await dataSource
    .createQueryBuilder()
    .from(Users, "users")
    .select("users", "userTechs.technologies")
    .leftJoinAndSelect("users.userTechs", "userTechs")
    .leftJoinAndSelect("userTechs.technologies", "technologies")
    .getMany();

  return users;
};
