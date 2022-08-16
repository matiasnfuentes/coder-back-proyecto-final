import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { setUpPassport } from "./passportSetup";
import {
  DOMAIN,
  MONGO_URL,
  SESSION_EXPARTION_TIME,
  SESSION_SECRET,
} from "./config";
import * as handleBars from "express-handlebars";
import { requestLogger } from "../middlewares/requestLogger";
import express from "express";
import passport from "passport";
import cors from "cors";

const VIEWS_PATH = __dirname + "/../public/views";
const PARTIALS_PATH = __dirname + "/../public/views/partials/";

export const setUpApp = (app: express.Application) => {
  // Set render engine
  app.engine(
    "hbs",
    handleBars.engine({
      extname: ".hbs",
      layoutsDir: VIEWS_PATH,
      partialsDir: PARTIALS_PATH,
    })
  );
  app.set("views", VIEWS_PATH);
  app.set("view engine", "hbs");
  console.log(SESSION_EXPARTION_TIME);

  // Server configs
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: MONGO_URL,
        ttl: SESSION_EXPARTION_TIME || 600,
      }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(
    cors({
      origin: [`http://${DOMAIN}`, `https://${DOMAIN}`],
    })
  );
  app.use(requestLogger);

  // Initialize passport

  app.use(passport.initialize());
  app.use(passport.session());

  setUpPassport(passport);
};
