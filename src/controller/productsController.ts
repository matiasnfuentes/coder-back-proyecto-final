import express, { Request, Response } from "express";
import { ProductDTO } from "../model/productModel";
import { productService } from "../services/productService";
import { checkBodyErrors } from "../middlewares/validator";
import { rejectRequest } from "../middlewares/rejectRequest";

const { Router } = express;

export const products = Router();

const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (id) {
      res.send(await productService.getById(id));
    } else {
      res.send(await productService.getAll());
    }
  } catch (e: any) {
    rejectRequest(
      res,
      e,
      "An error occurred while trying to retrieve the products."
    );
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    checkBodyErrors(req);

    const product = req.body as ProductDTO;
    const savedProduct = await productService.addProduct(product);
    res.send(savedProduct);
  } catch (e: any) {
    rejectRequest(res, e, "The product couldn't be added");
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await productService.deleteProductById(id);
    res.send({ _id: id });
  } catch (e: any) {
    rejectRequest(res, e, "The product couldn't be deleted");
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    checkBodyErrors(req);

    const { id } = req.params;
    const updates = req.body;
    const updatedProduct = await productService.updateProduct(id, updates);
    res.send(updatedProduct);
  } catch (e: any) {
    rejectRequest(res, e, "The product couldn't be updated");
  }
};

const getByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.params.category;

    res.send(await productService.getByCategory(category));
  } catch (e: any) {
    rejectRequest(
      res,
      e,
      "An error occurred while trying to retrieve the products."
    );
  }
};

export const productsController = {
  addProduct,
  deleteProduct,
  get,
  updateProduct,
  getByCategory,
};
