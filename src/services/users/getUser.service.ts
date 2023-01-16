import dataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users/user.interface";
import { responseUserSerializer } from "../../serializers/users/users.serializers";

export const getUserService = async (userId: string): Promise<IUser> => {
  const user = await dataSource
    .createQueryBuilder()
    .from(Users, "users")
    .select([
      "users.id",
      "users.email",
      "users.username",
      "users.name",
      "users.avatarUrl",
      "users.bio",
      "users.contact",
      "users.isActive",
      "users.isAdm",
      "users.createdAt",
      "users.updatedAt",
      "users.deletedAt",
      "technologies",
    ])
    .leftJoinAndSelect("users.userTechs", "userTechs")
    .leftJoinAndSelect("userTechs.technologies", "technologies")
    .where({
      id: userId,
    })
    .getOne();

  const userWithoutPassword = await responseUserSerializer.validate(user, {
    stripUnknown: true,
  });

  return userWithoutPassword;
};
