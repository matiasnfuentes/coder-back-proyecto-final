import { Response } from "express";
import { logger } from "../services/logger";

type Exception = {
  message?: string;
  status?: number;
};

export const rejectRequest = (
  res: Response,
  exception: Exception,
  defaultMessage: string
) => {
  logger.error(exception);
  res.status(exception.status || 500).send(exception.message || defaultMessage);
};
