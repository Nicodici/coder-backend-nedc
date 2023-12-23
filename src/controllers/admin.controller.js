import {UsersService} from "./../services/users.services.js"

export class AdminController {
    static getUsers = async (req,res)=>{
    try {
            const users = await UsersService.getUsers();
            res.status(200).send ({status:"success",data:users});
        } catch (error) {
            console.log(error)
            res.status(400).json({status: "error", message: error.message})
        }
    };

    static deleteUsers = async (req,res)=>{
        try {
            const {uid} = req.params;
            const user = await UsersService.getUserById(uid);
            if(user){
                await UsersService.deleteUser(uid);
                res.status(200).json({status: "success", message: "User deleted successfully"});
            }else{
                res.status(400).json({status: "error", message: "User not found"});
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({status: "error", message: error.message})
        }
    };

    
    static modifyRole = async(req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
            const userRole = user.role;
            if(user.documents.length>=3 && user.status === "completo"){
                if(userRole === "user"){
                    user.role = "premium";
                } else if(userRole === "premium"){
                    user.role = "user";
                } else {
                    return res.json({status:"error", message:"No se puede cambiar el rol de este usuario"});
                };
                await UsersService.updateUser(user._id,user);
                return res.json({status:"success", message:`El nuevo rol del usuario es ${user.role}`});
            } else {
                res.json({status:"error", message:"El usuario no ha cargado todos los documentos"});
            }
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
}