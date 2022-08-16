import { Cart } from "../model/cartModel";

export interface DAO<T> {
  get(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  save(elementoAGuardar: T): Promise<T>;
  delete(id: string): Promise<void>;
  update(id: string, modificacion: Modificacion<T>): Promise<T>;
}

export type Serializable = {
  _id?: string;
};
export type Modificacion<T> = Partial<T>;

export type CartDTO = Omit<
  Cart,
  "addProduct" | "addProducts" | "deleteProduct"
>;

export type ProductDTO = {
  name: string;
  description: string;
  code: string;
  thumbnail: string;
  price: number;
  stock: number;
  category: string;
} & Serializable;

export type MessageDTO = {
  author: {
    id: string;
    firstName: string;
    lastName: string;
    age: string;
    alias: string;
    avatar: string;
  };
  text: string;
} & Serializable;

export interface UserDTO extends Serializable {
  email: string;
  password: string;
  name: string;
  address: string;
  age: number;
  avatar: string;
  phone: string;
  token?: string;
  isAdmin?: string;
}
