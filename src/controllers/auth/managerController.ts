import { Role, User } from "../../models/index";
import { Request, Response } from "express";
import bcrypt from "bcrypt"

//Đăng ký tài khoản cho quản lý
const registerManager = async (req: Request, res: Response) => {
    const {email, firstname, lastname, phonenumber, password} = req.body;
    try{
        if(email){
            //kiểm tra email đã tồn tại chưa
            const checkemail = await User.findOne({where: {email}});
            if(checkemail){
                return res.status(400).json({message: "Email đã tồn tại"});
            }else{
                //Tiền xử lý dữ liệu

                //Mã hóa mật khẩu trước khi lưu vào database
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                //Tạo user mới
                const newuser = await User.create({
                    email,
                    firstname,
                    lastname,
                    phonenumber,
                    password: hashedPassword
                })
                //Tạo Role mới liên kết 1-1 với user
                const role = await Role.create({
                    id_user: newuser.id,
                    role_name: "quanly",
                })
                return res.status(201).json({message: "Đăng ký thành công", user: {...newuser, ...role}});
            }
        }
    }catch(err){
        return res.status(404).json({message: err});
    }
}
