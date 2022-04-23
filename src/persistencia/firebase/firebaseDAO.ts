import { Firestore } from "firebase-admin/firestore";
import { Serializable } from "../../modelo/types";
import { DAO } from "../types";
import { firebaseConnect } from "../dbConfig";

export class FirebaseDAO<T extends Serializable> implements DAO<T> {
  db: Firestore;
  collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.db = firebaseConnect();
  }

  async obtener(id: string): Promise<T> {
    const res = this.db.collection(this.collectionName).doc(id);
    const e = await res.get();
    if (!e.exists) throw "El elemento no existe";
    return { ...e.data(), id: res.id } as T;
  }

  async obtenerTodos(): Promise<T[]> {
    const documentsSnapshot = await this.db
      .collection(this.collectionName)
      .get();
    const result: T[] = [];
    documentsSnapshot.forEach((d) => {
      const element = { ...d.data(), id: d.id };
      result.push(element as T);
    });
    return result;
  }

  async guardar(elementoAGuardar: T): Promise<T> {
    // Los campos undefined no pueden ser guardados por firestore, necesito removerlos
    Object.keys(elementoAGuardar).forEach(
      (key) =>
        elementoAGuardar[key] === undefined && delete elementoAGuardar[key]
    );
    const timestamp = Date.now();
    const res = await this.db
      .collection(this.collectionName)
      .add({ ...elementoAGuardar, timestamp });
    return { ...elementoAGuardar, id: res.id, timestamp };
  }

  async eliminar(id: string): Promise<void> {
    await this.db.collection(this.collectionName).doc(id).delete();
  }

  async modificar(id: string, modificacion: Partial<T>): Promise<T> {
    const res = await this.db
      .collection(this.collectionName)
      .doc(id)
      .update({ ...modificacion });
    return await this.obtener(id);
  }
}
