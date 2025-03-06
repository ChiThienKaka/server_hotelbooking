import { Router } from "express";
import {create} from "../../controllers/Hotel_Properties/roompriceController"
import { verifyToken, checkRole} from "../../middlewares/auth.middleware";
const router = Router();

router.post('/roomprice/create',verifyToken,checkRole(["quanly"]), create);


export default router;


