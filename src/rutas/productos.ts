import { Router } from "express";
import { Producto } from "../modelo/types";
import { esAdministrador } from "./middleware/administrador";
import { productoService } from "../server";

export const productos = Router();

productos.post("/", esAdministrador, async (req, res) => {
  try {
    const producto: Producto = req.body;
    res.send(await productoService.crearProducto(producto));
  } catch (e) {
    res.status(500).send("No se pudo guardar el producto");
  }
});

productos.get("/:id?", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.send(await productoService.obtenerTodos());
    const producto: Producto | undefined = await productoService.obtener(
      parseInt(id)
    );
    res.send(producto);
  } catch (e: any) {
    res.status(e.status).send({ error: e.message });
  }
});

productos.delete("/:id", esAdministrador, async (req, res) => {
  const { id } = req.params;
  try {
    await productoService.eliminar(parseInt(id));
    res.send("Producto eliminado exitosamente");
  } catch (e: any) {
    res.status(e.status).send({ error: e.message });
  }
});

productos.put("/:id", esAdministrador, async (req, res) => {
  const { id } = req.params;
  const modificacion = req.body;
  try {
    res.send(await productoService.modificar(parseInt(id), modificacion));
  } catch (e: any) {
    res.status(e.status).send({ error: e.message });
  }
});
