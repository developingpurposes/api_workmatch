import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";

export const deleteUserService = async (
  deleteUserId: string
): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(Users);

    const user = await userRepository.findOneBy({
      id: deleteUserId,
    });

    if (!user) {
      throw new AppError("Invalid id!", 404);
    }

    if (!user.isActive) {
      throw new AppError("User is already inactive", 400);
    }

    await userRepository.softRemove(user);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};
