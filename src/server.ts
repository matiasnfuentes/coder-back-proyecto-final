import express from "express";
import { productos } from "./rutas/productos";
import { carrito } from "./rutas/carrito";
import { ProductoService } from "./services/productoService";
import { CarritoService } from "./services/carritoService";
import { getDAOS } from "./persistencia/getDAOS";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { productoDAO, carritoDAO } = getDAOS();
export const productoService = new ProductoService(productoDAO);
export const carritoService = new CarritoService(carritoDAO, productoService);

// Rutas
app.use("/api/productos", productos);
app.use("/api/carrito", carrito);

app.use((req, res) => {
  res.status(404).send({
    error: -2,
    descripcion: `ruta ${req.path} método ${req.method} no implementada`,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`conectado al puerto: ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

app.on("error", (error) => console.log(`Error en servidor ${error}`));
