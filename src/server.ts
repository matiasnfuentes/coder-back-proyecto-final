import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import parseArgs from "minimist";
import cluster from "cluster";
import * as os from "os";
import { createApp } from "./app";
import { setupIo } from "./config/ioSetup";
import { logger } from "./services/logger";

const { port: parameterPort, mode } = parseArgs(process.argv.slice(2));
const PORT = process.env.PORT || parameterPort || 8080;

// Server config
const createServer = (serverPort: number) => {
  const server = new HttpServer(createApp());
  const io: IOServer = new IOServer(server);
  setupIo(io);
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
