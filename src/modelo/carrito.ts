import { ICarrito, Producto } from "./types";

export class Carrito implements ICarrito {
  productos: Producto[];
  id?: string;
  timestamp?: number;
  constructor(id?: string, timestamp?: number, productos: Producto[] = []) {
    this.id = id;
    this.timestamp = timestamp;
    this.productos = productos;
  }

  agregarProductos(nuevosProductos: Producto[]): Producto[] {
    nuevosProductos.forEach((productoNuevo) => {
      const indice = this.productos.findIndex(
        (productoActual) => productoActual.id === productoNuevo.id
      );
      if (indice === -1) {
        this.productos.push(productoNuevo);
      } else {
        this.productos[indice].stock += productoNuevo.stock;
      }
    });
    return this.productos;
  }

  //Elimina un producto del carrito y lo devuelve
  eliminarProducto(productoID: string): Producto {
    const i: number = this.productos.findIndex((p) => p.id === productoID);
    if (i === -1)
      throw { message: "El producto a eliminar no existe en el carrito" };
    return this.productos.splice(i, 1)[0];
  }
}
