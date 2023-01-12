// import AppDataSource from "../data-source"
// import { Request, Response, NextFunction } from 'express';
// import { Property } from "../entities/properties.entity"
// import { AppError } from "../errors/AppErrors";

// const ensureScheduleIsUniqueMiddleware = async (req: Request, res: Response, next: NextFunction) => {

//     const { hour, date } = req.body
//     const propertyRepository = AppDataSource.getRepository(Property);

//     const scheduleExists = await propertyRepository.
//     createQueryBuilder("property").
//     innerJoinAndSelect("property.schedule", "schedule").
//     innerJoinAndSelect("schedule.userId", "user").
//     where("schedule.date = :date", {date: date}).
//     where("schedule.hour = :hour", {hour: hour}).
//     getOne() 

//     if (scheduleExists) {
//         throw new AppError("This schedule already exists", 409);
//     }

//     return next()
// }

// export default ensureScheduleIsUniqueMiddleware