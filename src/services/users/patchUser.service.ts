import dataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IUser, IUserUpdate } from "../../interfaces/users";
import { responseUserSerializer } from "../../serializers/users.serializers";

export const patchUserService = async (
  newData: IUserUpdate,
  userId: string,
  patchUserId: string
): Promise<IUser> => {
  try {
    const userRepository = dataSource.getRepository(Users);

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
      throw new AppError("Missing admin permition", 401);
    }

    if ("isAdmin" in newData || "isActive" in newData || "id" in newData) {
      throw new AppError("You can't patch this fields", 401);
    }

    const updatedUser = userRepository.create({
      ...patchProfile,
      ...newData,
    });
    await userRepository.save(updatedUser);

    const responseUpdatedUser = await responseUserSerializer.validate(
      updatedUser,
      {
        stripUnknown: true,
        abortEarly: false,
      }
    );

    return responseUpdatedUser;
  } catch (error) {
    throw new AppError(error.message, 401);
  }
};
