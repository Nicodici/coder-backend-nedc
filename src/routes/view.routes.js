import { Router } from "express";

import { checkUserAuth, showLoginView } from "../middlewares/auth.js";

import { ViewsController } from "../controllers/views.controller.js";

const router = Router();

router.get("/", ViewsController.renderHome);

router.get("/realTime", ViewsController.renderRealTimeProducts);

router.get("/login", showLoginView , ViewsController.renderLogin);

router.get("/register", showLoginView, ViewsController.renderRegister);

router.get("/cart", ViewsController.renderCart);

router.get("/chat",ViewsController.renderChat);

router.get("/perfil", checkUserAuth, ViewsController.renderProfile);

export { router as viewRouter };
