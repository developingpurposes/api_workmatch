import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const ensureTechnologyMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.technologies === undefined) {
      req.body.technologies = [];
    }

    return next();
  };
