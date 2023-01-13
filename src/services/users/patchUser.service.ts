/* import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IUser, IUserUpdate } from "../../interfaces/users/user.interface";
import { responseUserSerializer } from "../../serializers/users/users.serializers";

export const patchUserService = async (
  newData: IUserUpdate,
  userId: string,
  patchUserId: string
) => {
  const userRepository = AppDataSource.getRepository(Users);

  const patchProfile = await userRepository.findOneBy({
    id: patchUserId,
  });

  if (!patchProfile) {
    throw new AppError("User not found!", 404);
  }

  const myProfile = await userRepository.findOneBy({
    id: userId,
  });

  if (myProfile.id !== patchProfile.id && !myProfile.isAdm) {
    throw new AppError("Missing admin permissions", 401);
  }

  const updatedUser = userRepository.create({
    ...patchProfile,
    ...newData,
  });
  await userRepository.save(updatedUser);

  userRepository.update;

  const responseUpdatedUser = await responseUserSerializer.validate(
    updatedUser,
    {
      stripUnknown: true,
      abortEarly: false,
    }
  );

  return responseUpdatedUser;
}; */

import { Projects } from "../../entities/projects.entity";
import dataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { In } from "typeorm";
import { IProjectUpdate } from "../../interfaces/projects/projects.interface";
import { Projects_technologies } from "../../entities/projects_technologies";
import { Technologies } from "../../entities/technologies.entity";
import { IUserUpdate } from "../../interfaces/users/user.interface";
import { Users } from "../../entities/users.entity";
import { Users_technologies } from "../../entities/users_technologies.entity";

export const patchUserService = async (
  newData: IUserUpdate,
  userId: string,
  patchUserId: string
) => {
  const technologiesIds = newData.technologies;

  const userRepository = dataSource.getRepository(Users);
  const userTechsRepository = dataSource.getRepository(Users_technologies);
  const technologyRepository = dataSource.getRepository(Technologies);

  const patchProfile = await userRepository.findOneBy({
    id: patchUserId,
  });

  if (!patchProfile) {
    throw new AppError("User not found!", 404);
  }

  const myProfile = await userRepository.findOneBy({
    id: userId,
  });

  if (myProfile.id !== patchProfile.id && !myProfile.isAdm) {
    throw new AppError("Missing admin permissions", 401);
  }

  const projectResponse = await userRepository.find({
    withDeleted: true,
    where: { id: patchUserId },
  });

  if (!projectResponse.length) {
    throw new AppError("Updating user is not allowed", 404);
  }

  if (!Object.keys(newData).length) {
    throw new AppError("Updating user is not allowed", 401);
  }

  delete newData.technologies;

  const updateUser = userRepository.create({
    ...projectResponse[0],
    ...newData,
  });
  await userRepository.save(updateUser);

  if (technologiesIds.length) {
    const techsSeach = await technologyRepository.find({
      where: {
        id: In(technologiesIds),
      },
    });

    if (!techsSeach.length) {
      throw new AppError("Technologies is not found!", 404);
    }

    await userTechsRepository
      .createQueryBuilder()
      .delete()
      .where({ user: patchUserId })
      .execute();

    techsSeach.forEach(async (newTechlogy) => {
      const userTechsResponse = userTechsRepository.create({});

      await userTechsRepository.save(userTechsResponse);

      await userTechsRepository.update(
        { id: userTechsResponse.id },
        {
          user: projectResponse[0],
          technologies: newTechlogy,
        }
      );
    });
  }

  return updateUser;
};
