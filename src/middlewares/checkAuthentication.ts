import { NextFunction, Request, Response } from "express";

export const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};
