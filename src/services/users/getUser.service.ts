import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users/user.interface";
import { responseUserSerializer } from "../../serializers/users.serializers";

export const getUserService = async (userId: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOneBy({
    id: userId,
  });
  const newUser = await responseUserSerializer.validate(user, {
    stripUnknown: true,
    abortEarly: false,
  });

  return newUser;
};
