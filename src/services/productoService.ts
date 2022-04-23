import { Modificacion, Producto } from "../modelo/types";
import { ProductoDAOI } from "../persistencia/types";

export class ProductoService {
  productoDAO: ProductoDAOI;
  constructor(productoDAO: ProductoDAOI) {
    this.productoDAO = productoDAO;
  }

  async crearProducto(producto: Producto): Promise<Producto> {
    return await this.productoDAO.guardar(producto);
  }

  async obtenerTodos(): Promise<Producto[]> {
    return await this.productoDAO.obtenerTodos();
  }

  async obtener(id: string): Promise<Producto> {
    try {
      return await this.productoDAO.obtener(id);
    } catch (e) {
      throw { status: 404, message: "ID de producto inexistente" };
    }
  }

  async eliminar(id: string): Promise<void> {
    return await this.productoDAO.eliminar(id);
  }

  async modificar(
    id: string,
    modificacion: Modificacion<Producto>
  ): Promise<Producto> {
    return await this.productoDAO.modificar(id, modificacion);
  }

  async modificarStock(
    productoEntrante: Producto,
    descontar?: boolean
  ): Promise<void> {
    const { id, stock: stockAModificar } = productoEntrante;
    const producto: Producto = await this.obtener(id!!);

    const nuevoStock = descontar
      ? producto.stock - stockAModificar
      : producto.stock + stockAModificar;
    if (nuevoStock < 0)
      throw {
        message: `El stock del producto ${id} es insuficiente`,
        status: 400,
      };
    await this.modificar(id!!, { stock: nuevoStock });
  }
}
