import { Request, Response, Router } from "express";
import { rejectRequest } from "../helpers/rejectRequest";
import { ProductDTO, UserDTO } from "../persistencia/types";
import { cartService } from "../services/cartService";

export const carrito = Router();

const addProduct = async (req: Request, res: Response) => {
  try {
    const { id, productId } = req.params;

    const {
      name,
      price,
      stock,
      description,
      code,
      thumbnail,
      category,
    }: ProductDTO = req.body;

    await cartService.addProduct(id, {
      _id: productId,
      name,
      price,
      stock,
      description,
      code,
      thumbnail,
      category,
    });
    res.redirect("/cart");
  } catch (e: any) {
    rejectRequest(res, e, "The product couldn't be added to the cart");
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id, productId } = req.params;
    await cartService.deleteProduct(id, productId);
    res.redirect("/cart");
  } catch (e: any) {
    rejectRequest(res, e, "The product couldn't be deleted from the cart");
  }
};

const checkout = async (req: Request, res: Response) => {
  const { email, name, phone } = req.user as UserDTO;
  try {
    cartService.checkout({ names: name, email, phoneNumber: phone });
    res.redirect("/products");
  } catch (e: any) {
    rejectRequest(res, e, "Checkout was unsuccessful");
  }
};

const getCart = async (req: Request, res: Response) => {
  const { email, address: deliverAddress } = req.user as UserDTO;
  try {
    res.send(await cartService.getOrCreateCart(email, deliverAddress));
  } catch (e: any) {
    rejectRequest(res, e, "The cart couldn't be created");
  }
};

export const carritoController = {
  checkout,
  getCart,
  addProduct,
  deleteProduct,
};
