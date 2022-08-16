import winston from "winston";

const filterLevel = (level: "error" | "warn") =>
  winston.format((info) => {
    if (info.level === level) {
      return info;
    }
    return false;
  })();

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: filterLevel("error"),
    }),
    new winston.transports.File({
      filename: "warn.log",
      level: "warn",
      format: filterLevel("warn"),
    }),
  ],
});
