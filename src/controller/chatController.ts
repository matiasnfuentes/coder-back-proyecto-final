import { chatService } from "../services/chatService";
import { checkBodyErrors } from "../middlewares/validator";
import { rejectRequest } from "../helpers/rejectRequest";
import { Request, Response } from "express";

const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    res.send(await chatService.getNormalizedMessages());
  } catch (e: any) {
    rejectRequest(
      res,
      e,
      "An error ocurred while trying to retrieve the messages."
    );
  }
};

const saveMessage = async (req: Request, res: Response) => {
  const mensaje = req.body;
  try {
    checkBodyErrors(req);
    await chatService.saveMessage(mensaje);
    res.send("guardado ok");
  } catch (e: any) {
    rejectRequest(res, e, "The message couldn't be saved.");
  }
};

export const chatController = { saveMessage, getMessages };
