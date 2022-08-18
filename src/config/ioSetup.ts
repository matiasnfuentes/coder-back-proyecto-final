import axios from "axios";
import { Server as IOServer, Socket } from "socket.io";
import { logger } from "../services/logger";
import { DOMAIN } from "./config";

// Socket events
export const setupIo = (io: IOServer) => {
  io.on("connection", (socket) => {
    logger.info("New client connected!");

    // Private chat
    socket.on("privateChatInitialized", async ({ email }) => {
      const { data: messages } = await axios.get(
        `http://${DOMAIN}/api/messages/${email}`
      );
      io.sockets.emit("messageRecieved", messages);
    });

    socket.on("newPrivateMessage", async (data) => {
      await axios.post(`http://${DOMAIN}/api/messages`, { ...data });
      const { data: messages } = await axios.get(
        `http://${DOMAIN}/api/messages/${data.email}`
      );
      io.sockets.emit("messageRecieved", messages);
    });

    // General chat
    socket.on("generalChatInitialized", async (data) => {
      const { data: messages } = await axios.get(
        `http://${DOMAIN}/api/messages`
      );
      io.sockets.emit("messageRecieved", messages);
    });

    socket.on("newMessage", async (data) => {
      await axios.post(`http://${DOMAIN}/api/messages`, { ...data });
      const { data: messages } = await axios.get(
        `http://${DOMAIN}/api/messages`
      );
      io.sockets.emit("messageRecieved", messages);
    });
  });
};
