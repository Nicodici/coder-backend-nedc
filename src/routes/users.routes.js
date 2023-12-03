import { Router } from "express";
import {UsersController} from "./../controllers/users.controller.js"
import {checkRole} from "../middlewares/auth.js";
const router = Router();

router.post ("/premium/:uid",checkRole(["admin"]), UsersController.modifyRole)

export {router as usersRouter}