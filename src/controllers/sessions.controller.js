import { usersDao } from "../dao/managers/index.js";
import { generateEmailToken } from "../helpers/gmail.js";
import { recoveryEmail } from "../helpers/gmail.js";

export class SessionsController {
  static renderRegister = async (req, res) => {
    try {
      const registerForm = req.body;
      console.log("datos del usuario en el formulario:",registerForm)
      const user = await usersDao.getUserByEmail(registerForm.email);
      console.log("busca si existe el usuario en la BD", user);
      if (user == null) {
        return res.render("register", {
          error: "El usuario ya esta registrado",
        });
      }
      const newUser = await usersDao.saveUser(registerForm);
      return res.render("login", { message: "Usuario Creado con exito" });
    } catch (error) {
      return res.render("register", { error: error.message });
    }
  };

  static renderRegisterFail = (req, res) => {
    res.send(
      '<p>Usuario o contraseña inválidos <a href="/login">Regresar</a></p>'
    );
  };

  static renderLogin = async (req, res) => {
    try {
      const loginForm = req.body;
      console.log(loginForm);
      const user = await usersDao.getUserByEmail(loginForm.email);
      if (!user) {
        return res.render("login", { error: "El usuario no esta registrado" });
      }
      if (user.password === loginForm.password) {
        req.session.userInfo = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        };
        res.redirect("/");
      } else {
        return res.render("login", { error: "Credenciales Invalidas" });
      }
    } catch (error) {
      res.render("register", { error: error.message });
    }
  };

  static renderLoginFail = (req, res) => {
    res.send(
      '<p>No se pudo loguear al usuario, <a href="/login">Regresar</a></p>'
    );
  };

  static renderLogout = (req, res) => {
    req.session.destroy((error) => {
      if (error)
        return res.render("profile", { user: req.session.user, error });
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
}
