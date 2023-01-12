import { IUserLogin } from "../../interfaces/users/user.interface";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import "dotenv/config";
import { AppError } from "../../errors/appError";

export const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(Users);
  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User or password invalid", 401);
  }

  if (user.isActive == false) {
    throw new AppError("User invalid", 401);
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError("User or password invalid", 401);
  }

  const token = jwt.sign(
    {
      isActive: user.isActive,
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  return token;
};
