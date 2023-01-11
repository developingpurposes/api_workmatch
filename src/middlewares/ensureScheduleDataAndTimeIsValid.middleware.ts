// import { Request, Response, NextFunction } from 'express';
// import { AppError } from "../errors/AppErrors";

// const ensureScheduleDataAndTimeIsValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {

//     const { hour, date } = req.body
    
//     const scheduleDate = new Date(date).getDay();
//     if (scheduleDate === 0 || scheduleDate === 6){
//         throw new AppError("This date is invalid", 400)
//     } 
    
//     const scheduleHour = Number(hour.split(":")[0]);
//     if (scheduleHour < 8 || scheduleHour >= 18){
//         throw new AppError("This hour is invalid", 400)
//     } 


//     return next()
// }

// export default ensureScheduleDataAndTimeIsValidMiddleware