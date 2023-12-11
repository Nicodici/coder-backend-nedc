import { usersModel } from "../../models/users.model.js";

export class UsersMongo {
  constructor() {
    this.model = usersModel;
  }

  // Metodo para registrar los usuarios
  async saveUser(user) {
    try {
      console.log("user llega al dao",user)
       const  newUserBD = await this.model.create(user);
      console.log("nuevo usuario en la bd",newUserBD)
      return newUserBD;
    } catch (error) {
      throw new Error("Hubo un error al guardar el usuario", error.message);
    }
  }

  // Metodo para obtener usuario por Id
  async getUserById(id) {
    try {
      const user = await this.model.findById(id).lean();
      if (!user) {
        throw new Error("El usuario no existe");
      }
      return user;
    } catch (error) {
      throw new Error("Hubo un error al obtener el usuario", error.message);
    }
  }

  // Metodo para obtener usuario por email
  async getByEmail(userEmail){
    try {
      const user = await this.model.findOne({email:userEmail}).lean();
        if(user){
            return user;
        } else{
            return null;
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

  //actualizar el usuario
  async updateUser(id, user) {
    try {
      return await this.model.findByIdAndUpdate(id, user);
    } catch (error) {
      throw new Error("Hubo un error al actualizar el usuario", error.message);
    }
  }
}
