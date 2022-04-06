import { Carrito } from "./carrito";

export type Serializable = {
  id?: number;
  timestamp?: number;
};

export type Producto = {
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
} & Serializable;

export interface ICarrito extends Serializable {
  productos: Producto[];
  agregarProductos: (productos: Producto[]) => void;
  eliminarProducto: (productoID: number) => Producto;
}

export type Modificacion<T> = Partial<T>;
export type CarritoDTO = Omit<Carrito, "agregarProductos" | "eliminarProducto">;
