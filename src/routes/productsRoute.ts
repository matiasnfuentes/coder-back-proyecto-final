import express from "express";

import { productsController } from "../controller/productsController";
import { isAdmin } from "../middlewares/isAdmin";
import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  validate,
} from "../middlewares/validator";

const { Router } = express;
const { get, addProduct, deleteProduct, updateProduct, getByCategory } =
  productsController;

export const productsRoute = Router();

productsRoute.get("/:id?", get);
productsRoute.get("/category/:category", getByCategory);
productsRoute.post("/", isAdmin, validate(ADD_PRODUCT), addProduct);
productsRoute.put("/:id", isAdmin, validate(UPDATE_PRODUCT), updateProduct);
productsRoute.delete("/:id", isAdmin, deleteProduct);
