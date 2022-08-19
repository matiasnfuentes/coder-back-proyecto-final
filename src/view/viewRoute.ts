import { Router } from "express";
import { checkAuthentication } from "../middlewares/checkAuthentication";
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
  getAdminChat,
  getOrders,
} = viewController;

view.get("/", getLogin);

view.get("/register", getRegister);

view.get("/products", checkAuthentication, getMainPage);

view.get("/orders", checkAuthentication, getOrders);

view.get("/products/:category", checkAuthentication, getProductCategory);

view.get("/chat", checkAuthentication, getChat);

view.get("/chat/:email", checkAuthentication, getPrivateChat);

view.get("/profile", checkAuthentication, getProfile);

view.get("/cart", checkAuthentication, getCart);

view.get("/info", checkAuthentication, getInfo);

view.get("/login-fail", getLoginFail);

view.get("/register-fail", getRegisterFail);

// Only for admins

view.get("/admin/add-product", checkAuthentication, isAdmin, getAddProduct);

view.get("/admin/chat", checkAuthentication, isAdmin, getAdminChat);
