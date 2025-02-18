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

//Thêm hình ảnh khách sạnh
const createImage = async (req: Request, res: Response) => {
    const {idhotel} = req.params;
    try{
        // Tạo một mảng để lưu tên tất cả file đã upload
        if(Array.isArray(req.files)){
            const fileNames = req.files.map(file => file.filename);
            await Hotel.update({
                images: fileNames.join(',')
            }, {where: {id: idhotel}});

            res.status(200).json({message: "Cập nhật ảnh thành công"});
            return;
        }
        res.status(201).json({message: "Cập nhật ảnh thất bại"});
        return;
    }catch(err){
        res.status(500).json({message: err});
        return;
    }
}
export {create, getHotelRegisters, createImage}