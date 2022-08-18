import { NextFunction, Request, Response } from "express";
import { logger } from "../services/logger";

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {});
  next();
};

const redirectToMainPage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.redirect("/products");
};

const redirectToLogin = (req: Request, res: Response, next: NextFunction) => {
  res.redirect("/");
};

const handleUnimplementedRoutes = (req: Request, res: Response) => {
  logger.warn(`Route: ${req.path} - Method: ${req.method}`);
  res.status(404).send({
    error: -2,
    descripcion: `route ${req.path} method ${req.method} unimplemented`,
  });
};

export const userController = {
  logout,
  redirectToMainPage,
  redirectToLogin,
  handleUnimplementedRoutes,
};
