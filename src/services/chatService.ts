import { MessageDTO } from "../model/messageDTO";
import { DAOFactory, MESSAGE } from "../persistance/DAOFactory";
import { MessageDAO } from "../persistance/mongodb/messageDAO";

const messagesDAO = DAOFactory.createDAO(MESSAGE) as MessageDAO;

const getMessages = async (email: string, isAdmin?: boolean) =>
  isAdmin
    ? await messagesDAO.getAll()
    : await messagesDAO.getAllBy("private", false);

const getMessagesByAuthor = async (author: string) => {
  const messages: MessageDTO[] = await messagesDAO.getAllBy("email", author);
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
