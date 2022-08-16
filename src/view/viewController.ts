import { DOMAIN } from "../config/config";
import { CartDTO, UserDTO } from "../persistencia/types";
import { cartService } from "../services/cartService";
import * as os from "os";
import { Request, Response } from "express";
import { productService } from "../services/productService";
import axios from "axios";

const getLoginFail = (req: Request, res: Response) => {
  res.render("login-fail", { layout: "login-fail", domain: DOMAIN });
};

const getRegister = (req: Request, res: Response) => {
  res.render("register", { layout: "register", domain: DOMAIN });
};

const getRegisterFail = (req: Request, res: Response) => {
  res.render("register-fail", { layout: "register-fail", domain: DOMAIN });
};

const getLogin = (req: Request, res: Response) => {
  res.render("login", { layout: "login", domain: DOMAIN });
};

const getMainPage = async (req: Request, res: Response) => {
  const { data: products } = await axios.get(`http://${DOMAIN}/api/products/`);
  res.render("index", { layout: "index", domain: DOMAIN, products });
};

const getChat = (req: Request, res: Response) => {
  res.render("chat", { layout: "chat", domain: DOMAIN });
};

const getPrivateChat = (req: Request, res: Response) => {
  res.render("chat", { layout: "chat", domain: DOMAIN });
};

const getProfile = (req: Request, res: Response) => {
  const { email, name, address, age, avatar, phone } = req.user as UserDTO;
  res.render("profile", {
    layout: "profile",
    domain: DOMAIN,
    email,
    age,
    name,
    avatar,
    phone,
    address,
  });
};

const getCart = async (req: Request, res: Response) => {
  try {
    const { data: cart } = await axios.get(`http://${DOMAIN}/api/cart/`, {
      headers: { Cookie: `connect.sid=${req.cookies["connect.sid"]}` },
    });
    res.render("cart", {
      layout: "cart",
      products: cart.products,
    });
  } catch (e) {
    res.redirect("/products");
  }
};

const getInfo = (req: Request, res: Response) => {
  const { argv, execPath, platform, version, pid, memoryUsage, cwd } = process;
  const { rss } = memoryUsage();
  res.render("info", {
    layout: "info",
    argv,
    execPath,
    platform,
    version,
    pid,
    rss,
    currentDir: cwd(),
    cpus: os.cpus().length,
  });
};

export const getAddProduct = (req: Request, res: Response) => {
  res.render("add-product", {
    layout: "add-product",
  });
};

export const getProductCategory = async (req: Request, res: Response) => {
  try {
    // nimplemented View
    const category = req.params.category;
    const products = await productService.getByCategory(category);
    res.send(products);
  } catch (e) {
    res.redirect("/products");
  }
};

export const viewController = {
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
};
