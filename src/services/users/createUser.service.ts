import dataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces/users";
import { responseUserSerializer } from "../../serializers/users.serializer";

export const createUserService = async (
  userData: IUserRequest
): Promise<Users> => {
  try {
    const userRepository = dataSource.getRepository(Users);

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
