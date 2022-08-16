import { Router } from "express";
import { chatController } from "../controller/chatController";
import { validate, ADD_MESSAGE } from "../middlewares/validator";

export const chatRoute = Router();
const { getMessages, saveMessage } = chatController;

chatRoute.get("/", getMessages);
chatRoute.post("/", validate(ADD_MESSAGE), saveMessage);
