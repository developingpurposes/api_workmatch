import dataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { In } from "typeorm";
import { Technologies } from "../../entities/technologies.entity";
import { IUserUpdate } from "../../interfaces/users/user.interface";
import { Users } from "../../entities/users.entity";
import { Users_technologies } from "../../entities/users_technologies.entity";

export const patchUserService = async (
  newData: IUserUpdate,
  patchUserId: string
) => {
  let technologiesIds = newData.technologies;

  if (technologiesIds == undefined) {
    technologiesIds = [];
  }

  const userRepository = dataSource.getRepository(Users);
  const userTechsRepository = dataSource.getRepository(Users_technologies);
  const technologyRepository = dataSource.getRepository(Technologies);

  const patchProfile = await userRepository.findOneBy({
    id: patchUserId,
  });

  delete newData.technologies;

  const updateUser = userRepository.create({
    ...patchProfile,
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
          user: patchProfile,
          technologies: newTechlogy,
        }
      );
    });
  }

  return updateUser;
};
