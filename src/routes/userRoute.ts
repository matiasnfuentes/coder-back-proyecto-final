import { Router } from "express";
import { userController } from "../controller/usercontroller";
import passport from "passport";
import { validate, CREATE_USER, LOGIN } from "../middlewares/validator";
import { upload } from "../middlewares/upload";

export const userRoute = Router();

const { logout, redirectToMainPage, redirectToLogin } = userController;

userRoute.post(
  "/login",
  validate(LOGIN),
  passport.authenticate("login", { failureRedirect: "/login-fail" }),
  redirectToMainPage
);

userRoute.post(
  "/register",
  upload.single("avatar"),
  validate(CREATE_USER),
  passport.authenticate("signup", { failureRedirect: "/register-fail" }),
  redirectToMainPage
);

userRoute.get("/logout", logout, redirectToLogin);
