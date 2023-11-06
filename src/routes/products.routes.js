import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { validateFields } from "../middlewares/prods.js";

const router = Router();

router.get("/", ProductsController.getProducts);

router.get("/:pid", ProductsController.getProductById);

router.post("/", validateFields, ProductsController.addProduct);

router.put("/:pid", validateFields, ProductsController.updateProduct);

router.delete("/:pid", ProductsController.deleteProduct);

export { router as productsRouter };
