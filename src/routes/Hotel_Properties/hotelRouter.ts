import { Router } from "express";
import {create, getHotelRegisters} from "../../controllers/Hotel_Properties/hotelController"
import { verifyToken, checkRole} from "../../middlewares/auth.middleware";
const router = Router();

router.post('/hotel-create',verifyToken,checkRole(["quanly"]), create);

router.get('/hotel/register-isboolean',verifyToken,checkRole(["quanly"]), getHotelRegisters);

export default router;


