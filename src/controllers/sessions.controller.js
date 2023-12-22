import { generateEmailToken } from "../helpers/gmail.js";
import { recoveryEmail } from "../helpers/gmail.js";
import { UsersService } from "../services/users.services.js";

export class SessionsController {
  static redirectLogin = (req,res)=>{
    res.redirect("/login");
};

static failSignup = (req,res)=>{
  res.send("<p>No se pudo registrar al usuario, <a href='/register'>intenta de nuevo</a></p>");
};

  static renderRegisterFail = (req, res) => {
    res.send(
      '<p>Usuario o contraseña inválidos <a href="/login">Regresar</a></p>'
    );
  };

  static renderProfile = (req,res)=>{
    const user = req.user;
    res.render("profile",{user});
};

  static renderLoginFail = (req, res) => {
    res.send(
      '<p>No se pudo loguear al usuario, <a href="/login">Regresar</a></p>'
    );
  };
  
  static forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UsersService.getUserByEmail(email);
      console.log("user",user)
      if (user == null) {
        const errorUser = {
          status: "error",
          message: "El usuario no existe"
        }
        return res.render("/recupassword",{errorUser});
        
      } else {
        const token = generateEmailToken(email, 5 * 60);
        await recoveryEmail(req, email, token);
        res.send("correo enviado");
      }
    } catch (error) {
      res.json({
        status: "error",
        message: "No es posible reestablecer la contraseña",
      });
    }
  };
  
  static logout = async(req,res)=>{
    try {
      const user = req.user;
      user.last_connection= new Date();
      await UsersService.updateUser(user._id, user);
      await req.session.destroy();
      console.log("hasta aca llega")
      //aca tengo un problema para redirigir al home cuando cierro la sesion del usuario desde el perfil
    } catch (error) {
      res.json({status:"error", message:"No se pudo cerrar la sesion"});
    }
  }
}