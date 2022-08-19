declare global {
  namespace Express {
    export interface User {
      email: string;
      name: string;
      address: string;
      age: number;
      avatar: string;
      phone: string;
      isAdmin?: boolean;
    }
  }
}

export {};
