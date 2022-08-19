import { Serializable } from "../persistance/types";
import { ProductDTO } from "./productModel";

export interface ICart extends Serializable {
  products: ProductDTO[];
  addProducts: (products: ProductDTO[]) => void;
  addProduct: (product: ProductDTO) => void;
  deleteProduct: (productoID: string) => ProductDTO;
}

export class Cart implements ICart {
  products: ProductDTO[];
  timestamp: number;
  owner: string;
  deliverAddress: string;
  _id?: string;

  constructor(
    owner: string,
    deliverAddress: string,
    products: ProductDTO[] = [],
    timestamp: number = new Date().getTime(),
    _id?: string
  ) {
    this.deliverAddress = deliverAddress;
    this._id = _id;
    this.timestamp = timestamp;
    this.products = products;
    this.owner = owner;
  }

  addProduct(newProduct: ProductDTO): ProductDTO[] {
    const indice = this.products.findIndex(
      (currentProduct) => currentProduct._id === newProduct._id
    );
    if (indice === -1) {
      this.products.push(newProduct);
    } else {
      this.products[indice].stock += newProduct.stock;
    }
    return this.products;
  }

  addProducts(products: ProductDTO[]): ProductDTO[] {
    products.forEach((newProduct) => this.addProduct(newProduct));
    return this.products;
  }

  deleteProduct(productoID: string): ProductDTO {
    const i: number = this.products.findIndex((p) => p._id === productoID);
    if (i === -1)
      throw { status: 404, message: "Product doesn't not exist in the cart" };
    return this.products.splice(i, 1)[0];
  }
}

export type CartDTO = Omit<
  Cart,
  "addProduct" | "addProducts" | "deleteProduct"
>;
