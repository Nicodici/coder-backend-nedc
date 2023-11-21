import { ProductService } from "../services/products.services.js";
import { addLogger } from "../helpers/logger.js";

const logger = addLogger();

export class ProductsController {
  static getProducts = async (req, res) => {
    try {
      const result = await ProductService.getProducts();
      if (req.query.limit) {
        result = result.slice(0, req.query.limit);
        return res.send({
          status: "Success",
          data: result,
          message: "Productos obtenidos",
        });
      }
      res.send({ status: "Success", data: users });
    } catch (error) {
      logger.error("Error al obtener los productos");
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  static getProductById = async (req, res) => {
    try {
      const result = await ProductService.getProductById(
        parseInt(req.params.pid)
      );
      res.send({
        status: "Success",
        data: result,
        message: "Producto por id obtenido",
      });
    } catch (error) {
      logger.warn("Error al obtener el producto por ID");
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  static addProduct = async (req, res) => {
    try {
      const result = await ProductService.addProduct(req.body);
      res.json({ status: "Success", data: result, message: "producto creado" });
    } catch (error) {
      logger.warn("Error al crear un producto");
      res.status(400).send("Error al crear un producto");
    }
  };

  static updateProduct = async (req, res) => {
    try {
      let pid = req.params.pid;
      let product = req.body;
      let result = await ProductService.updateProduct(pid, product);
      if (result) {
        result.id = pid;
        res.json({ status:"success", data: result});
      } else {
        res.status(400).json({ error: "El producto no existe" });
      }
    } catch (error) {
      res.status(400).send("Error al actualizar un producto");
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await ProductService.deleteProduct(req.params.pid);
      if (deletedProduct !== null) {
        res.json({ status: "Success", data: deletedProduct, message:"Producto eliminado"});
      }
        res.status(400).json({ error: "El producto no existe" });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };
}
