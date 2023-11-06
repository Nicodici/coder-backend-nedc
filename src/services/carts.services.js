import { cartDao } from "./../dao/managers/index.js";

export class CartService {
  static getCarts = async () => {
    return await cartDao.getCarts();
  };
  static getCartbyId = async (id) => {
    return await cartDao.getCartById(id);
  };
  static addCart = async (cart) => {
    return await cartDao.addCart(cart);
  };
  static addProductToCart = async (cid, product) => {
    return await cartDao.addProductInCart(cid,product);
  };
  static deleteProductInCart = async (cid,product) =>{
    return await cartDao.deleteProductInCart
  };
  static deleteCart = async (cid) => {
    return await cartDao.deleteCartbyCid(cid);
  };
  static updateOneProduct = async (cid, product) =>{
    return await cartDao.updateOneProduct(cid,product);
  };
}
