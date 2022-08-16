import { userService } from "../services/userService";
import { Strategy as LocalStrategy } from "passport-local";
import { PassportStatic } from "passport";
import { logger } from "../services/logger";
import { transporter } from "../services/messageService";
import { ADMIN_EMAIL } from "./config";
import { checkBodyErrors } from "../middlewares/validator";
import { UserDTO } from "../persistencia/types";

export const setUpPassport = (passport: PassportStatic) => {
  passport.serializeUser((user: any, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email: string, done) => {
    const user = await userService.getUserByEmail(email);
    done(null, user);
  });

  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          checkBodyErrors(req);

          const { name, address, age, phone } = req.body;

          const user: UserDTO = await userService.createUser({
            email,
            password,
            name,
            address,
            age,
            avatar: req.file?.filename || userService.DEFAULT_IMAGE,
            phone,
          });

          const mailOptions = {
            from: "E-commerce",
            to: ADMIN_EMAIL,
            subject: "A new user has been registered",
            html: `<h1>A new user has been registered:</h1>
           <p>Email: ${email}</p>
           <p>Name: ${name}</p>
           <p>Address: ${address}</p>
           <p>Age: ${age}</p>
           <p>Phone: ${phone}</p>`,
          };

          transporter.sendMail(mailOptions);

          return done(null, user);
        } catch (e: any) {
          logger.warn(e.message || "User already exists");
          return done(null, false);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          checkBodyErrors(req);
          const user = await userService.verifyUser(email, password);
          return done(null, user);
        } catch (e) {
          logger.warn("Email or password is incorrect");
          return done(null, false);
        }
      }
    )
  );
};
