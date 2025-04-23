import { Router } from "express";
import { getUser } from "../../controllers/auth/userController";
const router = Router();
//lấy danh sách thành viên theo quyền 
router.get('/user/get-info/:role_name', getUser);

export default router