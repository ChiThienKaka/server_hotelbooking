import { Request, Response } from "express";
import { Hotel } from "../../models/index";

const create = async (req:Request, res: Response) => {
    const payload = req.body;
    try{
        const hotel = await Hotel.create(payload);
        res.status(200).json(hotel);
        return;
    }catch(err){
        res.status(500).json({message: err});
        return;
    }
}

//Lấy khách sạn chưa hoàn thành toàn bộ thủ tục đăng ký
const getHotelRegisters = async (req: Request, res: Response) => {
    try{
        const hotel = await Hotel.findAll({where: {isRegister: false}, raw: true});
        res.status(200).json(hotel);
    }catch(err){
        res.status(500).json({message: err});
        return;
    }
}

export {create, getHotelRegisters}