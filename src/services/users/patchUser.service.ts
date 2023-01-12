import AppDataSource from "../../data-source";
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
    throw new AppError("Missing admin permition", 401);
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
};
