import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import * as yup from "yup";

export const ensureIdIsValidMiddleware =
  (entity: any) => async (req: Request, res: Response, next: NextFunction) => {
    const testUuid = yup.string().uuid("id does not exist");

    const id = req.params.id;

    await testUuid.validate(id);

    const repository = AppDataSource.getRepository(entity);

    const idData = await repository.findOne({
      where: { id: id },
      withDeleted: true,
    });

    if (!idData) {
      return res.status(404).json({
        message: "id does not exist",
      });
    }

    return next();
  };
