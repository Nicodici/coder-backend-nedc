import { usersDao } from "../dao/managers/index.js";

export class UsersService{
    static getUserByEmail = async(email)=>{
        return await usersDao.getByEmail(email);
    };

    static saveUser = async(newUser)=>{
        return await usersDao.save(newUser);
    };

    static getUserById = async(userId)=>{
        return await usersDao.getUserById(userId);
    };

    static updateUser = async(userId,userInfo)=>{
        return await usersDao.updateUser(userId,userInfo);
    };

};