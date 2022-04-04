import { Carrito } from "../modelo/carrito";
import { CarritoDTO, Producto } from "../modelo/types";
import { CarritoDAO } from "../persistencia/carritoDAO";
import { ProductoService } from "./productoService";

export class CarritoService {
  carritoDAO: CarritoDAO;
  productoService: ProductoService;
  constructor(carritoDAO: CarritoDAO, productoService: ProductoService) {
    this.carritoDAO = carritoDAO;
    this.productoService = productoService;
  }

  async crearCarrito(): Promise<CarritoDTO> {
    return await this.carritoDAO.guardar({ productos: [] });
  }

  async obtener(id: number): Promise<CarritoDTO> {
    return await this.carritoDAO.obtener(id);
  }

  async obtenerProductos(id: number): Promise<Producto[]> {
    const carrito: CarritoDTO = await this.obtener(id);
    return carrito.productos;
  }

  private async recuperarEInstanciarCarrito(id: number): Promise<Carrito> {
    const { timestamp, productos } = await this.obtener(id);
    return new Carrito(id, timestamp, productos);
  }

  async agregarProductos(
    id: number,
    nuevosProductos: Producto[]
  ): Promise<CarritoDTO> {
    const carrito: Carrito = await this.recuperarEInstanciarCarrito(id);

    /* El descuento del stock en realidad debería darse bajo un contexto de transación,
    es decir, si alguno producto falla porque no tiene stock, se tiene que volver toda
    la operación para atras. Pero dado que estamos persistiendo en archivos, por ahora
    no tiene mucho sentido profundizar en eso. */

    for (const producto of nuevosProductos) {
      await this.productoService.modificarStock(producto, true);
    }

    carrito.agregarProductos(nuevosProductos);
    return await this.carritoDAO.modificar(id, carrito);
  }

  async eliminarProducto(id: number, productoId: number): Promise<CarritoDTO> {
    const carrito: Carrito = await this.recuperarEInstanciarCarrito(id);
    try {
      const producto: Producto = carrito.eliminarProducto(productoId);
      await this.productoService.modificarStock(producto);
      return await this.carritoDAO.modificar(id, carrito);
    } catch (e: any) {
      throw { status: e.status | 404, message: e.message };
    }
  }

  async eliminarCarrito(id: number): Promise<void> {
    const productos: Producto[] = await this.obtenerProductos(id);
    for (const producto of productos) {
      await this.productoService.modificarStock(producto);
    }

    await this.carritoDAO.eliminar(id);
  }
}
// VER PORQUE ROMPE EL CARRITO CUANDO ELIMINO
