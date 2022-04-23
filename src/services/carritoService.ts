import { Carrito } from "../modelo/carrito";
import { CarritoDTO, Producto } from "../modelo/types";
import { CarritoDAOI } from "../persistencia/types";
import { ProductoService } from "./productoService";

export class CarritoService {
  carritoDAO: CarritoDAOI;
  productoService: ProductoService;
  constructor(carritoDAO: CarritoDAOI, productoService: ProductoService) {
    this.carritoDAO = carritoDAO;
    this.productoService = productoService;
  }

  async crearCarrito(): Promise<CarritoDTO> {
    return await this.carritoDAO.guardar(new Carrito());
  }

  async obtener(id: string): Promise<CarritoDTO> {
    try {
      return await this.carritoDAO.obtener(id);
    } catch (e) {
      throw { status: 404, message: `Carrito con id ${id} inexistente` };
    }
  }

  async obtenerProductos(id: string): Promise<Producto[]> {
    const carrito: CarritoDTO = await this.obtener(id);
    return carrito.productos;
  }

  private async recuperarEInstanciarCarrito(id: string): Promise<Carrito> {
    const { timestamp, productos } = await this.obtener(id);
    return new Carrito(id, timestamp, productos);
  }

  async agregarProductos(
    id: string,
    nuevosProductos: Producto[]
  ): Promise<CarritoDTO> {
    const carrito: Carrito = await this.recuperarEInstanciarCarrito(id);

    /* El descuento del stock en realidad debería darse bajo un contexto de transación,
    es decir, si alguno producto falla porque no tiene stock, se tiene que volver toda
    la operación para atras. */

    for (const producto of nuevosProductos) {
      await this.productoService.modificarStock(producto, true);
    }

    carrito.agregarProductos(nuevosProductos);
    return await this.carritoDAO.modificar(id, carrito);
  }

  async eliminarProducto(id: string, productoId: string): Promise<CarritoDTO> {
    const carrito: Carrito = await this.recuperarEInstanciarCarrito(id);
    try {
      const producto: Producto = carrito.eliminarProducto(productoId);
      await this.productoService.modificarStock(producto);
      return await this.carritoDAO.modificar(id, carrito);
    } catch (e: any) {
      throw { status: e.status || 404, message: e.message };
    }
  }

  async eliminarCarrito(id: string): Promise<void> {
    const productos: Producto[] = await this.obtenerProductos(id);
    for (const producto of productos) {
      await this.productoService.modificarStock(producto);
    }

    await this.carritoDAO.eliminar(id);
  }
}
