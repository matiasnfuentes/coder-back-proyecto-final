declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DAO_TYPE: "file" | "mongo" | "firestore";
      NODE_ENV: "development" | "production";
      PORT?: string;
    }
  }
}

export {};
