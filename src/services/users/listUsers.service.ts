import dataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users/user.interface";
import { usersListSerializer } from "../../serializers/users/users.serializers";

export const listUserService = async (): Promise<IUser[]> => {
  const users = await dataSource
    .createQueryBuilder()
    .from(Users, "users")
    .withDeleted()
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
      "technologies.id",
    ])
    .leftJoinAndSelect("users.userTechs", "userTechs")
    .leftJoinAndSelect("userTechs.technologies", "technologies")
    .getMany();

  const validatedData: IUser[] = await usersListSerializer.validate(users, {
    abortEarly: false,
    stripUnknown: true,
  });

  return validatedData;
};
