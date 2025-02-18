import { Router } from "express";
import {create, getHotelRegisters, createImage} from "../../controllers/Hotel_Properties/hotelController"
import { verifyToken, checkRole} from "../../middlewares/auth.middleware";
import { uploadRoom } from "../../middlewares/upload/index";
const router = Router();

router.post('/hotel-create',verifyToken,checkRole(["quanly"]), create);

router.get('/hotel/register-isboolean',verifyToken,checkRole(["quanly"]), getHotelRegisters);

router.post('/hotel/create-image/:idhotel', uploadRoom.array('images', 10),verifyToken,checkRole(["quanly"]), createImage)

export default router;


