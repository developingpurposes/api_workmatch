
import dataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { In } from "typeorm";
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
    const techsSearch = await technologyRepository.find({
      where: {
        id: In(technologiesIds),
      },
    });

    if (!techsSearch.length) {
      throw new AppError("Technologies is not found!", 404);
    }

    await userTechsRepository
      .createQueryBuilder()
      .delete()
      .where({ user: patchUserId })
      .execute();

    techsSearch.forEach(async (newTechlogy) => {
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
