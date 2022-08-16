import { ProductDTO } from "../persistencia/types";

export namespace OrderType {
  export const GENERATED = "GENERATED";
  export const PENDING = "PEDING";
  export const COMPLETED = "COMPLETED";
}

export type OrderType = typeof OrderType[keyof typeof OrderType];
export type OrderItem = Pick<
  ProductDTO,
  "_id" | "stock" | "price" | "description"
>;

export class Order {
  client: string;
  items: OrderItem[];
  timestamp: number;
  status: OrderType;
  number?: number;
  _id?: string;

  constructor(
    client: string,
    items: OrderItem[] = [],
    status: OrderType = OrderType.COMPLETED
  ) {
    this.client = client;
    this.items = items;
    this.status = status;
    this.timestamp = new Date().getTime();
  }
}
