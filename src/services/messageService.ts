import { createTransport } from "nodemailer";
import twilio from "twilio";
import {
  ADMIN_EMAIL,
  ADMIN_EMAIL_PASS,
  TWILIO_AUTHTOKEN,
  TWILIO_SID,
} from "../config/config";
import { ProductDTO } from "../model/productModel";
import { UserDTO } from "../model/userModel";

const EMAIL_HOST = "smtp.ethereal.email";
const EMAIL_PORT = 587;

const transporter = createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_EMAIL_PASS,
  },
});

const twilioClient = twilio(TWILIO_SID, TWILIO_AUTHTOKEN);

export const sendOrderNotifications = (
  products: ProductDTO[],
  email: string,
  phoneNumber: string,
  name: string
) => {
  const productList = products.reduce(
    (prev, current) =>
      prev +
      `<div>Code: ${current.code} Name: ${current.name} Price: $${current.price} Count: ${current.stock}</div>`,
    ""
  );
  const mailOptions = {
    from: "E-commerce",
    to: ADMIN_EMAIL,
    subject: "Nuevo pedido",
    html: `<h1>Se ha generado un nuevo pedido:</h1>
      ${productList}`,
  };
  const adminWppNotification = {
    body: `Nuevo pedido de ${name}. Mail: ${email}`,
    from: "whatsapp:+14155238886",
    to: "whatsapp:+5491123458427",
  };

  twilioClient.messages.create(adminWppNotification);
  transporter.sendMail(mailOptions);

  // User notification
  const userNotification = {
    body: `Tu pedido al e-commerce ha sido recibido y está en proceso.`,
    from: "+19895348213",
    to: phoneNumber,
  };

  twilioClient.messages.create(userNotification);
};

export const sendRegisterNotification = (user: UserDTO) => {
  const { email, name, address, age, phone } = user;
  const mailOptions = {
    from: "E-commerce",
    to: ADMIN_EMAIL,
    subject: "A new user has been registered",
    html: `<h1>A new user has been registered:</h1>
   <p>Email: ${email}</p>
   <p>Name: ${name}</p>
   <p>Address: ${address}</p>
   <p>Age: ${age}</p>
   <p>Phone: ${phone}</p>`,
  };

  transporter.sendMail(mailOptions);
};
