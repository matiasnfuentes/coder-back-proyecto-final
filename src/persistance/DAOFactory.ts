import { CartDAO } from "./mongodb/cartDAO";
import { MessageDAO } from "./mongodb/messageDAO";
import { OrderDAO } from "./mongodb/orderDAO";
import { ProductDAO } from "./mongodb/productDAO";
import { UserDAO } from "./mongodb/userDAO";

export class DAOFactory {
  static createDAO(type: string) {
    if (type === CART) {
      return CartDAO.getInstance();
    } else if (type === MESSAGE) {
      return MessageDAO.getInstance();
    } else if (type === PRODUCT) {
      return ProductDAO.getInstance();
    } else if (type === ORDER) {
      return OrderDAO.getInstance();
    } else {
      return UserDAO.getInstance();
    }
  }
}

export const CART = "Cart";
export const MESSAGE = "Message";
export const USER = "User";
export const PRODUCT = "Product";
export const ORDER = "Order";
