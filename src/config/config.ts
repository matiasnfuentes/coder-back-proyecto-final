import dotenv from "dotenv";

dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const DOMAIN = process.env.DOMAIN;
export const TWILIO_SID = process.env.TWILIO_SID;
export const TWILIO_AUTHTOKEN = process.env.TWILIO_AUTHTOKEN;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_EMAIL_PASS = process.env.ADMIN_EMAIL_PASS;
export const SESSION_EXPARTION_TIME = process.env.SESSION_EXPARTION_TIME;
