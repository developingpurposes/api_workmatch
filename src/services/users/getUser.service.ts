import dataSource from "../../data-source";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users/user.interface";
import { responseUserSerializer } from "../../serializers/users/users.serializers";

export const getUserService = async (userId: string): Promise<IUser> => {
  const user = await dataSource
    .createQueryBuilder()
    .from(Users, "users")
    .select("users")
    .leftJoinAndSelect("users.userTechs", "userTechs")
    .leftJoinAndSelect("userTechs.technologies", "technologies")
    .where({
      id: userId,
    })
    .getOne();

  return user;
};
