import { normalize, schema } from "normalizr";
import { MessageDTO } from "../persistencia/types";
import { DAOFactory, MESSAGE } from "../persistencia/DAOFactory";
import { MessageDAO } from "../persistencia/mongodb/messageDAO";

const messagesDAO = DAOFactory.createDAO(MESSAGE) as MessageDAO;

const author = new schema.Entity("author");

const message = new schema.Entity(
  "message",
  { author: author },
  { idAttribute: "_id" }
);

const listOfMessages = new schema.Entity("messages", {
  messages: [message],
});

const getNormalizedMessages = async () => {
  const messages: MessageDTO[] = await messagesDAO.getAll();
  const originalData = { id: "messages", messages };
  return normalize(originalData, listOfMessages);
};

const saveMessage = async (message: MessageDTO) => {
  await messagesDAO.save(message);
};

export const chatService = { getNormalizedMessages, saveMessage };
