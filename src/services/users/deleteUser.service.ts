import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";

export const deleteUserService = async (
  deleteUserId: string
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOne({
    where: { id: deleteUserId },
    withDeleted: true,
  });

  if (!user.isActive) {
    throw new AppError("User is already inactive", 403);
  }

  if (!user) {
    throw new AppError("Invalid id!", 404);
  }

  await userRepository.softRemove(user);
  await userRepository.save({ ...user, isActive: false });
};
