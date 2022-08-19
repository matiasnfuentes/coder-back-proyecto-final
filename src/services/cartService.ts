import { Cart, CartDTO } from "../model/cartModel";
import { ProductDTO } from "../model/productModel";
import { CART, DAOFactory, ORDER } from "../persistance/DAOFactory";
import { CartDAO } from "../persistance/mongodb/cartDAO";
import { sendOrderNotifications } from "./messageService";
import { productService } from "./productService";
import { Order, OrderItem } from "../model/orderModel";
import { OrderDAO } from "../persistance/mongodb/orderDAO";

const cartDAO: CartDAO = DAOFactory.createDAO(CART) as CartDAO;
const orderDAO: OrderDAO = DAOFactory.createDAO(ORDER) as OrderDAO;

const getOrCreateCart = async (
  mail: string,
  deliverAddress: string
): Promise<CartDTO> => {
  try {
    return await getByOwnerEmail(mail);
  } catch (e) {
    return await createCart(mail, deliverAddress);
  }
};

const createCart = async (
  mail: string,
  deliverAddress: string
): Promise<CartDTO> => {
  return await cartDAO.save(new Cart(mail, deliverAddress));
};

const getCartModelById = async (id: string): Promise<Cart> => {
  try {
    const { timestamp, products, owner, deliverAddress } = await cartDAO.get(
      id
    );
    return new Cart(owner, deliverAddress, products, timestamp, id);
  } catch (e) {
    throw { status: 404, message: `Cart with id ${id} does not exists` };
  }
};

const getByOwnerEmail = async (email: string): Promise<CartDTO> => {
  try {
    return await cartDAO.getBy("owner", email);
  } catch (e) {
    throw { status: 404, message: `There is no cart for the given email` };
  }
};

const addProduct = async (
  cartId: string,
  newProduct: ProductDTO
): Promise<CartDTO> => {
  const cart: Cart = await getCartModelById(cartId);
  const haveEnoughStock = await productService.haveEnoughStock(newProduct);

  if (haveEnoughStock) {
    productService.decreaseStock(newProduct);
  } else {
    throw {
      status: 400,
      message: `${newProduct.name} doesn't have enough stock to be added to the cart.`,
    };
  }

  cart.addProduct(newProduct);
  return await cartDAO.update(cartId, cart);
};

const deleteProduct = async (
  cartId: string,
  productId: string
): Promise<CartDTO> => {
  const cart: Cart = await getCartModelById(cartId);
  const deletedProduct = cart.deleteProduct(productId);
  await productService.increaseStock(deletedProduct);
  return await cartDAO.update(cartId, cart);
};

const deleteByEmail = async (email: string): Promise<void> => {
  await cartDAO.deleteBy("owner", email);
};

const createOrder = async (
  email: string,
  items: OrderItem[]
): Promise<Order> => {
  const order = await orderDAO.save(new Order(email, items));
  return order;
};

const checkout = async ({ email, phoneNumber, name }) => {
  const { products } = await cartService.getByOwnerEmail(email);

  await createOrder(email, products);

  sendOrderNotifications(products, email, phoneNumber, name);

  await cartService.deleteByEmail(email);
};

const getOrders = async (email: string): Promise<Order[]> => {
  return await orderDAO.getAllBy("client", email);
};

export const cartService = {
  checkout,
  createCart,
  addProduct,
  getByOwnerEmail,
  deleteByEmail,
  getOrCreateCart,
  deleteProduct,
  getOrders,
};
