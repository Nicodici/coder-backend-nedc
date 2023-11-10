import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { gmailTransporter } from "../config/gmail.config.js";

export const generateEmailToken = (email, expireTime) => {
  //generar el token
  const token = jwt.sign({ email }, config.gmail.secretToken, {
    expiresIn: expireTime,
  });
  return token;
};

// funcion para generar enlace con token

export const recoveryEmail = async (useremail, emailToken) => {
  try {
    const domain = `${req.protocol}://${req.get("host")}`; //dominio de donde se esta enviando el email
    const linkRecovery = `${domain}/reset-password?token=${emailToken}`;  
    await gmailTransporter.sendMail({
        from:"Ecommerce CoderNEDC",
        to:useremail,
        subject:"Restablece tu contraseña",
        html:`
            <p>Solicitud de reestablecimiento de contraseña</p>
            <p><a href="${linkRecovery}">Click aqui para reestablecer tu contraseña </a></p>
            <p>Serás reedirigido a otra página</p
        `
    });
  } catch (error) {
    console.log(error.message);
  }
};
