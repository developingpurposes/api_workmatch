import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../src/data-source";
import { Users } from "../../src/entities/users.entity";

export const ensureIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Users);

  const userLogged = await userRepository.findOneBy({
    id: req.user.id,
  });

  if (userLogged.id != req.params.id && !userLogged.isAdm) {
    return res.status(403).json({
      message: "Missing admin permissions",
    });
  }

  return next();
};
