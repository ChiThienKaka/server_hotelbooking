import { Request, Response } from "express";
import { Room, Room_Bed } from "../../models/index";
import { Sequelize } from "sequelize";

//Tạo phòng mới
const create = async (req: Request, res: Response) => {
    const {idhotel} = req.params; // Lấy ID từ URL
    const payload = req.body;
    try{

        const {sophong} = payload;
        if(sophong){
            // Tạo phòng theo số phòng
            for(let i = 1; i <= sophong; i++){
                const roomValue = Object.fromEntries(Object.entries(payload).filter(([key, value]) => !key.startsWith("giuong")));
                const bedValue = Object.entries(payload).filter(([key, value]) => key.startsWith("giuong"));

                //Lấy id khách sạn và tạo Phòng dựa trên id khách sạn
                const room = await Room.create({
                    id_hotel : idhotel,
                    ...roomValue,
                    //Gán đè bằng 1
                    sophong: 1
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
            }
            res.status(200).json("OK tạo thành công");
            return;
        }
        res.status(200).json({message: "số phòng không đúng"});
        return
        
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
//lấy toàn bộ phòng mà không cần id khách sạn phục vụ cho cập nhật giá của phòng
const getRooms = async (req: Request, res: Response) => {
    try{
        const rooms = await Room.findAll({raw: true});
        // Lọc danh sách chỉ lấy các typeroom duy nhất
        const uniqueRooms = Array.from(
            new Map(rooms.map(room => [room?.loaichonghi, room])).values()
        );
        res.status(200).json(uniqueRooms);
        return;
    }catch(err){
        res.status(500).json({message: err});
        return;
    }
}
export {create, get, getRooms}