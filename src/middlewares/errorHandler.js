import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next) => {
  switch (error.code) {
    case EError.CREATEPROD_ERROR:
      res.json({ status: "Error", error: error.cause });
    case EError.DATABASE_ERROR:
      res.status(500)({ status: "Error", error: error.cause });
    case EError.AUTH_ERROR:
      res.status(401)({ status: "Error", error: error.cause });
    case EError.INVALID_JSON:
      res.status(500)({ status: "Error", error: error.cause });
  }
};
