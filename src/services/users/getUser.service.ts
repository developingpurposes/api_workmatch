import dataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users/user.interface";
import { userListSerializer } from "../../serializers/users/users.serializers";

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

  const userResponse = await userListSerializer.validate(user, {
    stripUnknown: true,
    abortEarly: false,
  });

  return userResponse;
};
