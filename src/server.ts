import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import parseArgs from "minimist";
import cluster from "cluster";
import * as os from "os";
import { createApp } from "./app";
import { setupIo } from "./config/ioSetup";
import { logger } from "./services/logger";
import { RequestHandler } from "express";
import { createSession } from "./config/appSetup";

const { mode } = parseArgs(process.argv.slice(2));

const PORT: number = process.env.PORT || 8080;

const createServer = (serverPort: number) => {
  const serverSession: RequestHandler = createSession();
  const server = new HttpServer(createApp(serverSession));
  const io: IOServer = new IOServer(server);

  setupIo(io, serverSession);

  server.listen(serverPort, () => {
    logger.info(`Server listening on ${serverPort}`);
    logger.info(`Worker ${process.pid} started`);
  });

  server.on("error", (error) => logger.error(`Error en servidor ${error}`));
};

if (mode === "CLUSTER" && cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  createServer(PORT);
}

process.on("uncaughtException", (err) => {
  logger.error(err);
});
