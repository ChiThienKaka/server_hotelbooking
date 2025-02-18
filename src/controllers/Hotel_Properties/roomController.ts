import { Request, Response } from "express";
import { Room, Room_Bed } from "../../models/index";
import { Sequelize } from "sequelize";

//Tạo phòng mới
const create = async (req: Request, res: Response) => {
    const {idhotel} = req.params; // Lấy ID từ URL
    const payload = req.body;
    try{
        const roomValue = Object.fromEntries(Object.entries(payload).filter(([key, value]) => !key.startsWith("giuong")));
        const bedValue = Object.entries(payload).filter(([key, value]) => key.startsWith("giuong"));
        //Lấy id khách sạn và tạo Phòng dựa trên id khách sạn
        const room = await Room.create({
            id_hotel : idhotel,
            ...roomValue
        })
        //thêm bào bảng Room_Bed
        const idroom = room.id;
        if(bedValue.length > 0){
            // for chờ async/await, forEach thì không
            for (const item of bedValue){
                switch(item[0]){
                    case "giuongdon":
                        await Room_Bed.create({
                            room_id: idroom,
                            bed_id: 1,
                            quantity: item[1]
                        })
                        break;
                    case "giuongdoi":
                        await Room_Bed.create({
                            room_id: idroom,
                            bed_id: 2,
                            quantity: item[1]
                        })
                        break;
                    case "giuonglon":
                        await Room_Bed.create({
                            room_id: idroom,
                            bed_id: 3,
                            quantity: item[1]
                        })
                        break;
                    case "giuongcuclon":
                        await Room_Bed.create({
                            room_id: idroom,
                            bed_id: 4,
                            quantity: item[1]
                        })
                        break;
                    case "giuongtang":
                        await Room_Bed.create({
                            room_id: idroom,
                            bed_id: 5,
                            quantity: item[1]
                        })
                        break;
                    case "giuongsofa":
                        await Room_Bed.create({
                            room_id: idroom,
                            bed_id: 6,
                            quantity: item[1]
                        })
                        break;
                    case "giuongfuton":
                        await Room_Bed.create({
                            room_id: idroom,
                            bed_id: 7,
                            quantity: item[1]
                        })
                        break;
                }
            }
        }
        res.status(200).json(roomValue);
        return;
    }catch(err){
        res.status(500).json({message: err});
        return;
    }
}
//Lấy phòng
const get = async (req: Request, res: Response) => {
    const {idhotel} = req.params; // Lấy ID từ URL
    try{
        const room = await Room.findAll({where: {id_hotel: idhotel},raw: true});
        //Gọi hàm tính tổng trên cột quantity dựa vào room_id
        const roombed = await Promise.all(room.map(async(item:any)=>{
            const beds = await Room_Bed.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_beds']
                ],
                where: {room_id: item.id}, 
                raw: true});
            return {...item, ...beds[0]};
        }))
        res.status(200).json(roombed);
        return;
    }catch(err){
        res.status(500).json({message: err});
        return;
    }
}
export {create, get}