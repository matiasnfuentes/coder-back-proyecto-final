import { Serializable } from "../persistance/types";

export namespace MessageType {
  export const USER = "USER";
  export const SYSTEM = "SYSTEM";
}

export type MessageType = typeof MessageType[keyof typeof MessageType];

export type MessageDTO = {
  email: string;
  text: string;
  type: MessageType;
  timestamp: number;
  private: boolean;
} & Serializable;
