import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { validateFields } from "../middlewares/prods.js";
import { productUploader } from "../utils.js";
import { checkAuthenticated, checkRole } from "./../middlewares/auth.js";

const router = Router();

router.get("/", ProductsController.getProducts); //ok

router.get("/:pid", ProductsController.getProductById); //ok

router.post("/",checkRole(["admin","premium"]), productUploader.single("avatar"), ProductsController.addProduct); //ok
// checkAuthenticated, , validateFields,
router.put("/:pid", validateFields, ProductsController.updateProduct); //ok

router.delete("/:pid", ProductsController.deleteProduct); //ok

export { router as productsRouter };
