import { Router } from "express";
import {create, getHotelRegisters, createImage, getImageHotel} from "../../controllers/Hotel_Properties/hotelController"
import { verifyToken, checkRole} from "../../middlewares/auth.middleware";
import { uploadRoom } from "../../middlewares/upload/index";
const router = Router();

router.post('/hotel-create',verifyToken,checkRole(["quanly"]), create);

router.post('/hotel/register-isboolean/:id_user',verifyToken,checkRole(["quanly"]), getHotelRegisters);

router.post('/hotel/create-image/:idhotel', uploadRoom.array('images', 10),verifyToken,checkRole(["quanly"]), createImage)

//Lấy hình ảnh của khách sạn
router.get('/hotel/get-image/:idhotel/:thumbnail', getImageHotel)
export default router;


