declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      SESSION_SECRET: string;
      SESSION_EXPARTION_TIME: number;
      JWT_SECRET: string;
      FORK: boolean;
      DOMAIN: string;
      PORT: number;
      TWILIO_SID: string;
      TWILIO_AUTHTOKEN: string;
      ADMIN_EMAIL: string;
      ADMIN_EMAIL_PASS: string;
    }
  }
}

export {};
