import { Request, Response } from "express";
import { rejectRequest } from "../middlewares/rejectRequest";
import { ProductDTO } from "../model/productModel";
import { cartService } from "../services/cartService";

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

    res.send(
      await cartService.addProduct(id, {
        _id: productId,
        name,
        price,
        stock,
        description,
        code,
        thumbnail,
        category,
      })
    );
  } catch (e: any) {
    rejectRequest(res, e, "The product couldn't be added to the cart");
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id, productId } = req.params;
    res.send(await cartService.deleteProduct(id, productId));
  } catch (e: any) {
    rejectRequest(res, e, "The product couldn't be deleted from the cart");
  }
};

const checkout = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      throw {
        status: 401,
        message: "You must be logged in to perform this action",
      };
    const { email, name, phone } = req.user;
    cartService.checkout({ name, email, phoneNumber: phone });
    res.send({ status: "success" });
  } catch (e: any) {
    rejectRequest(res, e, "Checkout was unsuccessful");
  }
};

const getCart = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      throw {
        status: 401,
        message: "You must be logged in to perform this action",
      };
    const { email, address: deliverAddress } = req.user;
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
