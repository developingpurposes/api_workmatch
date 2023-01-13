import AppDataSource from "../../data-source";
import { Projects } from "../../entities/projects.entity";
import { Technologies } from "../../entities/technologies.entity";
import { Users } from "../../entities/users.entity";
import { Users_technologies } from "../../entities/users_technologies.entity";
import { IUser } from "../../interfaces/users/user.interface";
import { listUsersSerializer } from "../../serializers/users/users.serializers";

export const listUsersService = async (): Promise<Array<IUser>> => {
  const userRepository = AppDataSource.getRepository(Users);

  const usersList = await userRepository.find();

  const responseList = await listUsersSerializer.validate(usersList, {
    stripUnknown: true,
    abortEarly: false,
  });

  return responseList;
};
