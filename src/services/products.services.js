import { productsDao } from "./../dao/managers/index.js";

export class ProductService {
  static getProducts = async () => {
    return await productsDao.getProducts();
  };
  static getProductById = async (id) => {
    return await productsDao.getProductById(id);
  };
  static addProduct = async (product) => {
    return await productsDao.addProduct(product);
  };
  static updateProduct = async (id, product) => {
    return await productsDao.updateProduct(id, product);
  };
  static deleteProduct = async (id) => {
    return await productsDao.deleteProduct(id);
  };
  static getProductsByPage =async (query,options)=>{
    return await productsDao.getProductsByPage(query,options);
  };
}
