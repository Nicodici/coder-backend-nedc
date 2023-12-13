import { ProductService } from "../services/products.services.js";
import { UsersService } from "../services/users.services.js";
import { verifyAdmin } from "./../utils.js";

export class ViewsController {
  static renderHome = async (req, res) => {
    try {
      const { limit = 10, page = 1, stock, sort = "asc" } = req.query;
      const stockValue = stock === 0 ? undefined : parseInt(stock);
      if (!["asc", "desc"].includes(sort)) {
        return res.render(
          "home",
          { products: products },
          { error: "El campo sort debe ser asc o desc" }
        );
      }
      const sortValue = sort === "asc" ? 1 : -1;
      let query = {};
      if (stockValue) {
        query = { stock: { $gte: stockValue } };
      }
      const result = await ProductService.getProductsByPage(query, {
        page,
        limit,
        sort: { price: sortValue },
        lean: true,
      });

      const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
      const resultProductsView = {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        page: result.page,
        prevPage: result.prevPage,
        hasPrevPage: result.hasPrevPage,
        prevLink: result.hasPrevPage
          ? baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)
          : null,
        nextPage: result.nextPage,
        hasNextPage: result.hasNextPage,
        nextLink: result.hasNextPage
          ? baseUrl.includes("page")
            ? baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`)
            : baseUrl.includes("?")
              ? baseUrl.concat(`&page=${result.nextPage}`)
              : baseUrl.concat(`?page=${result.nextPage}`)
          : null,
      };

      res.render("home", { ...resultProductsView, user: req.session.userInfo });
    } catch (error) {
      const products = await ProductService.getProducts();
      res.render("home", { products }, { user: req.session.userInfo });
    }
  };

  static renderRealTimeProducts = async (req, res) => {
    try {
      const isAdmin = verifyAdmin(req.user?.role);
      res.render("realTimeProducts", { isAdmin });

    } catch (error) {
      res.json ({status:error, message:error.message})
    }
  
  };
  static renderAdmin = async(req,res)=>{
    
    const usersList = await UsersService.getUsers();
    console.log(usersList)
    res.render("admin", {usersList});
  }
  static renderLogin = async (req, res) => {
    console.log(req.session.user)
    res.render("login", { user: req.session.userInfo });
  };

  static renderRegister = async (req, res) => {
    res.render("register", { user: req.session.userInfo });
  };

  static renderCart = async (req, res) => {
    res.render("cart", { user: req.session.userInfo });
  };
  static renderChat = async (req, res) => {
    res.render("chat", { user: req.session.userInfo });
  };

  static renderProfile = async (req, res) => {
    res.render("profile", { user: req.session.userInfo });
  };
  static renderforgot = async (req, res) => {
    res.render("recupassword");
  };

}
