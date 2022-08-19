import express from "express";

import { orderController } from "../controller/orderController";

const { Router } = express;
const { get } = orderController;

export const ordersRoute = Router();

ordersRoute.get("/:id?", get);
