import { DOMAIN } from "../config/config";
import * as os from "os";
import { Request, Response } from "express";
import { productService } from "../services/productService";
import axios from "axios";
import { Order } from "../model/orderModel";
import { ProductDTO } from "../model/productModel";
import _ from "lodash";

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
  const categories = getProductCategories(products);
  res.render("index", {
    layout: "index",
    domain: DOMAIN,
    products,
    categories,
  });
};

const getChat = (req: Request, res: Response) => {
  if (!req.user) return res.redirect("/login");

  const { email } = req.user;

  res.render("chat", {
    layout: "chat",
    isPublicChat: true,
    domain: DOMAIN,
    email,
    isAdminChat: false,
  });
};

const getAdminChat = (req: Request, res: Response) => {
  if (!req.user) return res.redirect("/login");

  const { email } = req.user;

  res.render("chat", {
    layout: "chat",
    isPublicChat: true,
    domain: DOMAIN,
    email,
    isAdminChat: true,
  });
};

const getPrivateChat = (req: Request, res: Response) => {
  if (!req.user) return res.redirect("/login");

  const { email } = req.user;

  res.render("chat", {
    layout: "chat",
    isPublicChat: false,
    domain: DOMAIN,
    email,
    isAdminChat: false,
  });
};

const getProfile = (req: Request, res: Response) => {
  if (!req.user) return res.redirect("/login");
  const { email, name, address, age, avatar, phone } = req.user;
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

const getOrders = async (req: Request, res: Response) => {
  try {
    const { data: orders } = await axios.get(`http://${DOMAIN}/api/orders/`, {
      headers: { Cookie: `connect.sid=${req.cookies["connect.sid"]}` },
    });
    console.log(orders.map((o) => o.items));
    res.render("orders", {
      layout: "orders",
      orders: orders.map((o: Order) => ({
        ...o,
        items: o.items.map(
          (i) => `${i.name} Cant.: ${i.stock} Precio Unit: ${i.price}`
        ),
        time: new Date(o.timestamp).toLocaleString(),
      })),
    });
  } catch (e) {
    console.log(e);
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
    const category = req.params.category;
    const products = await productService.getByCategory(category);
    const categories = getProductCategories(products);
    res.render("index", {
      layout: "index",
      domain: DOMAIN,
      products,
      categories,
    });
  } catch (e) {
    res.redirect("/products");
  }
};

const getProductCategories = (products: ProductDTO[]) =>
  _.uniq(products.map((p: ProductDTO) => p.category));

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
  getAdminChat,
  getOrders,
};
