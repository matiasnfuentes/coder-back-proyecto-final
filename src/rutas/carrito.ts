import { Router } from "express";
import { carritoService } from "../server";

export const carrito = Router();

carrito.post("/", async (req, res) => {
  try {
    res.send(await carritoService.crearCarrito());
  } catch (e) {
    res.status(500).send("No se pudo crear el carrito");
  }
});

carrito.get("/:id/productos", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    res.send(await carritoService.obtenerProductos(id));
  } catch (e: any) {
    res.status(e.status | 500).send({ error: e.message });
  }
});

carrito.post("/:id/productos", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    res.send(await carritoService.agregarProductos(id, req.body));
  } catch (e: any) {
    res.status(e.status).send(e.message);
  }
});

carrito.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    res.send(
      await carritoService.eliminarProducto(parseInt(id), parseInt(id_prod))
    );
  } catch (e: any) {
    res.status(e.status).send(e.message);
  }
});

carrito.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await carritoService.eliminarCarrito(parseInt(id));
    res.send("Eliminado OK");
  } catch (e: any) {
    res.status(e.status).send(e.message);
  }
});
