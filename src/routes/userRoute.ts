import { Router } from "express";
import { userController } from "../controller/usercontroller";
import passport from "passport";
import multer from "multer";
import { validate, CREATE_USER, LOGIN } from "../middlewares/validator";

export const userRoute = Router();

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    const { email } = req.body;
    const ext = file.originalname.split(".").pop();
    cb(null, email + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

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
