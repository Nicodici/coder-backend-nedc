import { CustomError } from "../services/error/customsError.service.js";
import { createProductErrorMsg } from "../services/error/createProductError.service.js";
import { EError } from "../enums/EError.js";

export const validateFields = (req, res, next) => {
  const { title, description, price, code, stock, category } =
    req.body;
  if (
    !title ||
    !description ||
    !price ||
    !code ||
    !stock ||
    !category
  ) {
    CustomError.createError({
      name: "Error creacion de producto",
      cause: createProductErrorMsg(req.body),
      message: "Existe un dato invalido para la creacion del usuario",
      errorCode: EError.CREATEPROD_ERROR,
    });
  }
  next();
};
