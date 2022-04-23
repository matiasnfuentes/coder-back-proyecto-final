import { CarritoDTO, Modificacion, Producto } from "../modelo/types";

export interface DAO<T> {
  obtener(id: string): Promise<T>;
  obtenerTodos(): Promise<T[]>;
  guardar(elementoAGuardar: T): Promise<T>;
  eliminar(id: string): Promise<void>;
  modificar(id: string, modificacion: Modificacion<T>): Promise<T>;
}

export interface ProductoDAOI extends DAO<Producto> {}
export interface CarritoDAOI extends DAO<CarritoDTO> {}
