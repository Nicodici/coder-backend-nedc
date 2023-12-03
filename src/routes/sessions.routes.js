import { Router } from "express";
import passport from "passport";
import { SessionsController } from "../controllers/sessions.controller.js";
import { profileUploader } from "../utils.js";

const router = Router();
//rutas de registro
            //multer agrega el objeto req.file
router.post("/register",profileUploader.single("profile"), passport.authenticate("signupStrategy", {failureRedirect:"/api/sessions/failSignup"}), SessionsController.redirectLogin);
router.get("/fail-Register", SessionsController.renderRegisterFail);
//rutas de login
router.post("/login",passport.authenticate("loginStrategy",{failureRedirect:"/api/sessions/fail-Login",}),SessionsController.renderProfile);
router.get("/fail-Login", SessionsController.renderLoginFail);
//ruta de logout
router.get("/logout", SessionsController.logout);
//ruta para recuperar password
router.post("/recupassword",SessionsController.forgotPassword)

export { router as sessionRouter };
