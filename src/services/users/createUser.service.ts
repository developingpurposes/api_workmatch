import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IUser, IUserRequest } from "../../interfaces/users";
import { responseUserSerializer } from "../../serializers/users.serializers";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUser> => {
  try {
    const userRepository = AppDataSource.getRepository(Users);

    const newUser = userRepository.create(userData);
    await userRepository.save(newUser);

    const userResponse = await responseUserSerializer.validate(newUser, {
      stripUnknown: true,
      abortEarly: false,
    });

    return userResponse;
  } catch (error) {
    throw new AppError("User already exists, try again with new informations");
  }
};
