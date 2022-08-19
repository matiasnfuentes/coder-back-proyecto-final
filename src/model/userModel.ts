import { Serializable } from "../persistance/types";

export interface UserDTO extends Serializable {
  email: string;
  password: string;
  name: string;
  address: string;
  age: number;
  avatar: string;
  phone: string;
  isAdmin?: boolean;
}
