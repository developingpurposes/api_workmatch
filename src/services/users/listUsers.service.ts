import dataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users";
import { listUsersSerializer } from "../../serializers/users.serializer";

export const listUsersService = async (): Promise<Array<IUser>> => {
  const userRepository = dataSource.getRepository(Users);

  const usersList = await userRepository.find();

  const responseList = await listUsersSerializer.validate(usersList, {
    stripUnknown: true,
    abortEarly: false,
  });

  return responseList;
};
