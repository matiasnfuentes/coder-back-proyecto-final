import { chatService } from "../services/chatService";
import { checkBodyErrors } from "../middlewares/validator";
import { rejectRequest } from "../middlewares/rejectRequest";
import { Request, Response } from "express";

const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user)
      throw {
        status: 401,
        message: "You must be logged in to perform this action",
      };
    const author: string = req.params.email;
    const { isAdmin, email } = req.user;
    if (author) {
      res.send(await chatService.getMessagesByAuthor(author));
    } else {
      res.send(await chatService.getMessages(email, isAdmin));
    }
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
    res.send(await chatService.saveMessage(mensaje));
  } catch (e: any) {
    rejectRequest(res, e, "The message couldn't be saved.");
  }
};

export const chatController = { saveMessage, getMessages };
