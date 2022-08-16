import { createTransport } from "nodemailer";
import twilio from "twilio";
import {
  ADMIN_EMAIL,
  ADMIN_EMAIL_PASS,
  TWILIO_AUTHTOKEN,
  TWILIO_SID,
} from "../config/config";

const EMAIL_HOST = "smtp.ethereal.email";
const EMAIL_PORT = 587;

export const transporter = createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_EMAIL_PASS,
  },
});

export const twilioClient = twilio(TWILIO_SID, TWILIO_AUTHTOKEN);
