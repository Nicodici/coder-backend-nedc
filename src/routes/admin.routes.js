import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
const router = Router();

router.get("/", AdminController.getUsers);

router.delete("/:uid", AdminController.deleteUsers);

export {router as adminRouter}