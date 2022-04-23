import * as fs from "fs";
import { Modificacion, Serializable } from "../../modelo/types";
import { DAO } from "../types";

export class FileDAO<T extends Serializable> implements DAO<T> {
  ruta: string;
  constructor(ruta: string) {
    this.ruta = ruta;
  }

  async obtenerTodos(): Promise<T[]> {
    try {
      const contenido = await fs.promises.readFile(this.ruta, "utf-8");
      return JSON.parse(contenido);
    } catch (e) {
      throw {
        message: `No se puede leer la db, o todavía no hay nada almacenado`,
        status: 500,
      };
    }
  }

  async guardar(elementoAGuardar: T): Promise<T> {
    const elemento: T = { ...elementoAGuardar, id: 0, timestamp: Date.now() };
    try {
      const elementos: T[] = await this.obtenerTodos();
      elemento.id = (
        parseInt(elementos[elementos.length - 1].id!!) + 1
      ).toString();
      await fs.promises.writeFile(
        this.ruta,
        JSON.stringify([...elementos, elemento])
      );
    } catch (e) {
      await fs.promises.writeFile(this.ruta, JSON.stringify([elemento]));
    } finally {
      return elemento;
    }
  }

  async obtener(id: string): Promise<T> {
    const elementos: T[] = await this.obtenerTodos();
    const elemento: T | undefined = elementos.find((e) => e.id === id);
    if (!elemento)
      throw {
        message: `No existe elemento con ese id`,
        status: 404,
      };
    return elemento;
  }

  async eliminar(id: string) {
    const elementos: T[] = await this.obtenerTodos();
    const indice = this.obtenerIndice(elementos, id);
    elementos.splice(indice, 1);
    await fs.promises.writeFile(this.ruta, JSON.stringify(elementos));
  }

  async modificar(id: string, modificacion: Modificacion<T>): Promise<T> {
    const elementos: T[] = await this.obtenerTodos();
    const indice = this.obtenerIndice(elementos, id);
    elementos[indice] = {
      ...elementos[indice],
      ...modificacion,
      timestamp: Date.now(),
    };
    await fs.promises.writeFile(this.ruta, JSON.stringify(elementos));
    return elementos[indice];
  }

  obtenerIndice(elementos: T[], id: string) {
    let indice: number = elementos.findIndex((p) => p.id === id);
    if (indice === -1) throw { status: 404, message: `Elemento no encontrado` };
    return indice;
  }
}
