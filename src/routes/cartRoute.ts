import { Router } from "express";
import { carritoController } from "../controller/cartController";
import {
  validate,
  ADD_PRODUCT_TO_CART,
  DELETE_PRODUCT_FROM_CART,
} from "../middlewares/validator";

import { checkAuthentication } from "../middlewares/checkAuthentication";

export const cartRoute = Router();
const { addProduct, checkout, getCart, deleteProduct } = carritoController;

cartRoute.get("/", checkAuthentication, getCart);

cartRoute.get("/checkout", checkout);

cartRoute.post(
  "/:id/product/:productId",
  validate(ADD_PRODUCT_TO_CART),
  addProduct
);

cartRoute.delete(
  "/:id/product/:productId",
  validate(DELETE_PRODUCT_FROM_CART),
  deleteProduct
);
