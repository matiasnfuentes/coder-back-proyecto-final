import { Request, Response, Router } from "express";
import { rejectRequest } from "../middlewares/rejectRequest";
import { cartService } from "../services/cartService";

const get = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      throw {
        status: 401,
        message: "You must be logged in to perform this action",
      };
    const { email } = req.user;
    res.send(await cartService.getOrders(email));
  } catch (e: any) {
    rejectRequest(res, e, "The orders couldn't be retrieved");
  }
};

export const orderController = {
  get,
};
