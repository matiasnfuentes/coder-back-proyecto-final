export interface DAO<T> {
  get(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  save(elementoAGuardar: T): Promise<T>;
  delete(id: string): Promise<void>;
  update(id: string, modificacion: Modification<T>): Promise<T>;
}

export type Serializable = {
  _id?: string;
};
export type Modification<T> = Partial<T>;
