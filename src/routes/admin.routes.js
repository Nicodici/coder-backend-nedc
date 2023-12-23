import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
const router = Router();

router.get("/", AdminController.getUsers);

router.delete("/:uid", AdminController.deleteUsers);

router.patch("/:uid/role", AdminController.modifyRole);

export {router as adminRouter}