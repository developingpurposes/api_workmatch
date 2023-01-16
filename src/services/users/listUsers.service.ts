import dataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser, IUserResponse } from "../../interfaces/users/user.interface";
import { usersListSerializer } from "../../serializers/users/users.serializers";

export const listUserService = async (
  limit: number,
  page: number
): Promise<IUserResponse> => {
  const count = await dataSource
    .createQueryBuilder(Users, "users")
    .select("COUNT(users.id)")
    .getCount();

  const totalPages: number = Math.ceil(count / limit);

  const isNotPage = page >= 1 ? page : 1;

  const validatedPage = isNotPage > totalPages ? totalPages : isNotPage;

  const skip: number = validatedPage * limit - limit;

  let nextPage: string =
    totalPages <= validatedPage
      ? null
      : `https://backend-workmatch.onrender.com/users?page=${
          validatedPage + 1
        }`;

  let previousPage: string =
    skip * limit <= 1
      ? null
      : `https://backend-workmatch.onrender.com/users?page=${
          validatedPage - 1
        }`;

  const users = await dataSource
    .createQueryBuilder()
    .from(Users, "users")
    .select("users")
    .leftJoinAndSelect("users.userTechs", "userTechs")
    .leftJoinAndSelect("userTechs.technologies", "technologies")
    .orderBy("users.createdAt", "DESC")
    .take(limit)
    .skip(skip)
    .withDeleted()
    .getMany();

  const validatedData: IUser[] = await usersListSerializer.validate(users, {
    abortEarly: false,
    stripUnknown: true,
  });

  const usersResponse = {
    nextPage: nextPage,
    previousPage: previousPage,
    totalPages: totalPages,
    users: validatedData,
  };

  return usersResponse;
};
