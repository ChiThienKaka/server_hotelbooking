import { Router } from "express";
import {create, get, getRooms} from "../../controllers/Hotel_Properties/roomController"
import { verifyToken, checkRole} from "../../middlewares/auth.middleware";
const router = Router();

router.post('/room/create/:idhotel',verifyToken,checkRole(["quanly"]), create);
router.get('/room/get-roombeds/:idhotel',verifyToken,checkRole(["quanly"]), get);
router.get('/room/get-rooms',verifyToken,checkRole(["quanly"]), getRooms)

export default router;


