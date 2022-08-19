import axios from "axios";
import { Request, RequestHandler, Response } from "express";
import passport from "passport";
import { Server as IOServer, Socket } from "socket.io";
import { logger } from "../services/logger";
import { DOMAIN } from "./config";

// Socket events
export const setupIo = (io: IOServer, serverSession: RequestHandler) => {
  const wrap = (middleware: RequestHandler) => (socket: Socket, next) =>
    middleware(socket.request as Request, {} as Response, next);

  io.use(wrap(serverSession));
  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.session()));

  io.on("connection", (socket: Socket) => {
    logger.info("New client connected!");
    const headers = {
      headers: { Cookie: socket.request.headers.cookie || "" },
    };

    // Private chat
    socket.on("privateChatInitialized", async ({ email }) => {
      const { data: messages } = await axios.get(
        `http://${DOMAIN}/api/messages/${email}`,
        headers
      );
      io.sockets.emit("messageRecieved", messages);
    });

    socket.on("newPrivateMessage", async (data) => {
      await axios.post(`http://${DOMAIN}/api/messages`, { ...data });
      const { data: messages } = await axios.get(
        `http://${DOMAIN}/api/messages/${data.email}`,
        headers
      );
      io.sockets.emit("messageRecieved", messages);
    });

    // General chat
    socket.on("generalChatInitialized", async (data) => {
      const { data: messages } = await axios.get(
        `http://${DOMAIN}/api/messages`,
        headers
      );
      io.sockets.emit("messageRecieved", messages);
    });

    socket.on("newMessage", async (data) => {
      await axios.post(`http://${DOMAIN}/api/messages`, { ...data });
      const { data: messages } = await axios.get(
        `http://${DOMAIN}/api/messages`,
        headers
      );
      io.sockets.emit("messageRecieved", messages);
    });
  });
};
