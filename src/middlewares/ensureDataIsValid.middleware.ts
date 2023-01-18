import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const ensureDataIsValidMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    req.body = validatedData;
    next();
  };
