import { normalize, schema } from "normalizr";
import { MessageDTO } from "../model/messageDTO";
import { DAOFactory, MESSAGE } from "../persistencia/DAOFactory";
import { MessageDAO } from "../persistencia/mongodb/messageDAO";

const messagesDAO = DAOFactory.createDAO(MESSAGE) as MessageDAO;

const getMessages = async () => {
  const messages: MessageDTO[] = await messagesDAO.getAllBy("private", false);
  return messages;
};

const getMessagesByAuthor = async (author: string) => {
  const messages: MessageDTO[] = await messagesDAO.getAllBy(
    "author.id",
    author
  );
  return messages;
};

const saveMessage = async (message: MessageDTO): Promise<MessageDTO> => {
  return await messagesDAO.save(message);
};

export const chatService = {
  getMessages,
  getMessagesByAuthor,
  saveMessage,
};
