import { Request, Response } from "express";
import { Role, User } from "../../models/index";

const getUser = async (req: Request, res: Response) => {
    const {role_name} = req.params;
    try{
        const role = await Role.findAll({where: {role_name: role_name}, raw: true});
        if(role.length > 0){
            const user = await Promise.all(role.map(async(item:any)=>{
                const result =  await User.findOne({where: {id: item.id_user}, raw: true});
                return {...item,...result, key: result?.id}
            })) 
            res.status(200).json(user);
            return;
        }
    }catch(err){
        res.status(500).json({message: err});
        return;
    }
}

export {getUser}