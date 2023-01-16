import { Request, Response } from "express";
import { joinProjectConfirmService } from "../../services/projects/joinprojectConfirm.service";


export const joinProjectConfirmController = async (req: Request, res:Response): Promise<Response> => {

    const ownerId: string = req.user.id
    
    const userId: string = req.params.id

    const data = await joinProjectConfirmService(ownerId, userId)

    return res.status(200).json({message:data})
}