import { Serializable } from "../persistance/types";

export type ProductDTO = {
  name: string;
  description: string;
  code: string;
  thumbnail: string;
  price: number;
  stock: number;
  category: string;
} & Serializable;
