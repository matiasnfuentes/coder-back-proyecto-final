import path from "path";
import { productsRoute } from "./routes/productsRoute";
import express from "express";
import { cartRoute } from "./routes/cartRoute";
import { chatRoute } from "./routes/chatRoute";
import { setUpApp } from "./config/appSetup";
import { userRoute } from "./routes/userRoute";
import { userController } from "./controller/usercontroller";
import { view } from "./view/viewRoute";

export const createApp = () => {
  const app = express();

  setUpApp(app);

  app.use(express.static(path.join(__dirname, "/../public/")));

  app.use("/api/cart", cartRoute);
  app.use("/api/messages", chatRoute);
  app.use("/api/products/", productsRoute);
  app.use("/api/user", userRoute);

  app.use("/", view);

  app.use(userController.handleUnimplementedRoutes);

  return app;
};
