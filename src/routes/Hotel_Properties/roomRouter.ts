import { Router } from "express";
import {create, get, getRooms, getRoomsById, updateBed_Room} from "../../controllers/Hotel_Properties/roomController"
import { verifyToken, checkRole} from "../../middlewares/auth.middleware";
const router = Router();

router.post('/room/create/:idhotel',verifyToken,checkRole(["quanly"]), create);
router.get('/room/get-roombeds/:idhotel',verifyToken,checkRole(["quanly"]), get);
router.get('/room/get-rooms/:idhotel',verifyToken,checkRole(["quanly"]), getRooms);

//lấy ra phòng theo id
router.get('/room/get-rooms-update/:idroom',verifyToken,checkRole(["quanly"]), getRoomsById);
//Lấy phòng để cập nhật
router.post('/room/get-rooms-update/update-room/:idroom',verifyToken,checkRole(["quanly"]), updateBed_Room );

export default router;


