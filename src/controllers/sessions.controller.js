import { usersDao } from "../dao/managers/index.js";
import { generateEmailToken } from "../helpers/gmail.js";
import { recoveryEmail } from "../helpers/gmail.js";
import { UsersService } from "../services/users.services.js";

export class SessionsController {
  static redirectLogin = (req,res)=>{
    res.redirect("/login");
};

static failSignup = (req,res)=>{
  res.send("<p>No se pudo registrar al usuario, <a href='/registro'>intenta de nuevo</a></p>");
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

  static renderLogout = (req, res) => {
    req.session.destroy((error) => {
      console.log("ok")
      if (error){
        return res.render("profile", { user: req.session, error });
      }
      console.log("error")
      res.redirect("/");
    });
  };

  static forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await usersDao.getUserByEmail(email);
      if (!user) {
        res.json({
          status: "error",
          message: "No es posible reestablecer la contraseña",
        });
      } else {
        const token = generateEmailToken(email, 5 * 60);
        await recoveryEmail(email, token);
        res.send("correo enviado,");
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
        res.render("/home")
    } catch (error) {
        console.log(error);
        res.json({status:"error", message:"No se pudo cerrar la sesion"});
    }
}
}
