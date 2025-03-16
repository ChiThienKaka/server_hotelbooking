import { Request, Response } from "express";
import { Hotel } from "../../models/index";
import path from "path";

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
        const {id_user} = req.params;
        const {isRegister} = req.body;
        const hotel = await Hotel.findAll({where: {isRegister: isRegister, id_user:id_user}, raw: true});
        res.status(200).json(hotel);
        return;
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

//lấy thumnbail khách sạn
const getImageHotel = (req: Request, res:Response) => {
    res.set('cross-origin-resource-policy', 'cross-origin');//cho phép từ các nguồn khác
    const {idhotel, thumbnail} = req.params;
    const filepath = path.join(__dirname, `../../../storage/hotel/${idhotel}/${thumbnail}`);
    res.sendFile(filepath,(err)=>{
        if(err){
            console.error('Error sending file:', err);
            return res.status(404).send('File not found');
        }
    })
}
export {create, getHotelRegisters, createImage, getImageHotel}