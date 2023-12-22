import { Router } from "express";
import { isAdmin, isLogin, showLoginView } from "../middlewares/auth.js";
import { ViewsController } from "../controllers/views.controller.js";

const router = Router();

router.get("/", ViewsController.renderHome); //ok, falta cargar imagenes de los productos

router.get("/realTime", ViewsController.renderRealTimeProducts);

router.get("/login",showLoginView ,ViewsController.renderLogin); //middleware ok

router.get("/register", showLoginView, ViewsController.renderRegister); //middleware ok

router.get("/logout", ViewsController.logOut); //ok

router.get("/cart", ViewsController.renderCart); //revisar

router.get("/chat", ViewsController.renderChat); //revisar

router.get("/perfil", isLogin, ViewsController.renderProfile); //middleware ok

router.get("/recupassword", ViewsController.renderforgot);

router.get("/admin",isLogin,isAdmin,ViewsController.renderAdmin) //middleware ok

router.get ("/reset-password", ViewsController.renderResetPassword); // ok

export { router as viewRouter };
