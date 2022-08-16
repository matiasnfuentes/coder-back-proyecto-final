import { Router } from "express";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import compression from "compression";
import { viewController } from "./viewController";
import { isAdmin } from "../middlewares/isAdmin";

export const view = Router();

const {
  getLoginFail,
  getRegister,
  getRegisterFail,
  getLogin,
  getMainPage,
  getProfile,
  getCart,
  getInfo,
  getAddProduct,
  getProductCategory,
  getChat,
  getPrivateChat,
} = viewController;

view.get("/products", checkAuthentication, getMainPage);

view.get("/products/:category", checkAuthentication, getProductCategory);

view.get("/chat", checkAuthentication, getChat);

view.get("/chat/:email", checkAuthentication, getPrivateChat);

view.get("/profile", checkAuthentication, getProfile);

view.get("/cart", checkAuthentication, getCart);

view.get("/info", compression(), getInfo);

view.get("/", getLogin);

view.get("/login-fail", getLoginFail);

view.get("/register", getRegister);

view.get("/register-fail", getRegisterFail);

view.get("/admin/add-product", checkAuthentication, isAdmin, getAddProduct);
