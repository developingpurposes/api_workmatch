import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IUser, IUserRequest } from "../../interfaces/users/user.interface";
import { responseUserSerializer } from "../../serializers/users.serializers";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(Users);

  const userExist = await userRepository.findOneBy({ email: userData.email });

  if (userExist) {
    throw new AppError(
      "User already exists, try again with new informations",
      409
    );
  }
  const newUser = userRepository.create(userData);
  await userRepository.save(newUser);

  const userResponse = await responseUserSerializer.validate(newUser, {
    stripUnknown: true,
    abortEarly: false,
  });

  return userResponse;
};
