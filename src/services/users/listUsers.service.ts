import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users";
import { listUsersSerializer } from "../../serializers/users.serializers";

export const listUsersService = async (): Promise<Array<IUser>> => {
  const userRepository = AppDataSource.getRepository(Users);

  const usersList = await userRepository.find();

  const responseList = await listUsersSerializer.validate(usersList, {
    stripUnknown: true,
    abortEarly: false,
  });

  return responseList;
};
