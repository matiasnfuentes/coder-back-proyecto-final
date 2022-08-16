import axios from "axios";
import { Server as IOServer, Socket } from "socket.io";
import { logger } from "../services/logger";
import { DOMAIN } from "./config";

// Socket events
export const setupIo = (io: IOServer) => {
  io.on("connection", (socket) => {
    logger.info("New client connected!");
    sendInitialData(socket);

    socket.on("newMessage", async (data) => {
      await axios.post(`http://${DOMAIN}/api/messages`, { ...data });
      const { data: messages } = await axios.get(
        `http://${DOMAIN}/api/messages`
      );
      io.sockets.emit("messageRecieved", messages);
    });
  });
};

const sendInitialData = async (socket: Socket) => {
  const { data: messages } = await axios.get(`http://${DOMAIN}/api/messages`);

  socket.emit("connected", {
    messages,
  });
};
