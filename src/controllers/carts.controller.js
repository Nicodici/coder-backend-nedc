import { ProductService } from "./../services/products.services.js";
import { CartService } from "../services/carts.services.js";

export class CartsControllers {
  static getCarts = async (req, res) => {
    try {
      const carts = await CartService.getCarts();
      res.send({ status: "Success", data: carts });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  static getCartById = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await CartService.getCartById(cid);
      res.send({ status: "success", data: cart });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  static addCart = async (req, res) => {
    try {
      const { products } = req.body;
      if (!Array.isArray(products)) {
        return res
          .status(400)
          .json({
            status: "error",
            message: "El campo products debe ser un array",
          });
      }
      const validProducts = [];

      for (const product of products) {
        const checkId = await ProductService.getProductById(product._id);

        if (!checkId) {
          return res
            .status(404)
            .json({
              status: "error",
              message: `El producto ${product._id} no existe`,
            });
        }
        validProducts.push(checkId);
      }

      const newCart = await CartService.addCart(validProducts);
      res.status(201).send({ status: "Succes", data: newCart });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  };

  static addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
      const validProduct = await productsDao.getProductById(pid);
      if (!validProduct) {
        return res
          .status(404)
          .send({ status: "error", message: error.message });
      }
      const cart = await cartDao.addProductToCart(cid, { _id: pid, quantity });
      return res
        .status(201)
        .send({
          status: "Success",
          message: "Producto agregado al carrito",
          data: cart,
        });
    } catch (error) {
      return res.status(500).send({ status: "error", message: error.message });
    }
  };

  static updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
      for (const product of products) {
        const checkId = await ProductService.getProductById(product.id);

        if (!checkId) {
          return res
            .status(404)
            .send({ status: "error", message: error.message });
        }
      }

      const updatedCart = await CartService.updateCart(cid, products);
      return res.status(201).send({
        status: "success",
        message: "Carrito actualizado",
        payload: updatedCart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "error", message: error.message });
    }
  };

  static deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
      const checkIdProduct = await ProductService.getProductById(pid);
      if (!checkIdProduct) {
        return res.status(404).send({ error: `El producto ${pid} no existe` });
      }

      const findProduct = checkIdProduct.products.findIndex(
        (product) => product._id.toString() === pid
      );
      if (findProduct === -1) {
        return res.status(404).send({ error: `El producto ${pid} no existe` });
      }

      checkIdProduct.products.splice(findProduct, 1);

      const updatedCart = await CartService.updateCart(
        cid,
        checkIdProduct.products
      );

      return res.status(201).send({
        status: "success",
        message: "Producto eliminado",
        cart: updatedCart,
      });
    } catch (error) {
      return res.status(500).send({ status: "error", message: error.message });
    }
  };

  static deleteCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await CartService.getCartById(cid);

      if (!cart) {
        return res
          .status(404)
          .send({ status: "error", error: `El carrito ${cid} no existe` });
      }

      if (cart.products.length === 0) {
        return res
          .status(404)
          .send({
            status: "error",
            error: `El carrito ${cid} no tiene productos`,
          });
      }

      cart.products = [];

      await CartService.updateOneProduct(cid, cart.products);
      return res
        .status(201)
        .send({ status: "success", message: "Carrito eliminado", cart: cart });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "error", message: error.message });
    }
  };
}
