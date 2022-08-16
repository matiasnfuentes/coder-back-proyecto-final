import { UserDTO } from "../persistencia/types";
import jwt from "jsonwebtoken";
import { UserDAO } from "../persistencia/mongodb/userDAO";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { JWT_SECRET } from "../config/config";
import { DAOFactory, USER } from "../persistencia/DAOFactory";

dotenv.config();

const PIRVATE_KEY = JWT_SECRET;
const DEFAULT_IMAGE = "default-avatar.png";
const userDAO: UserDAO = DAOFactory.createDAO(USER) as UserDAO;

const createUser = async (user: UserDTO): Promise<UserDTO> => {
  const { email, password } = user;

  try {
    const oldUser = await userDAO.getBy("email", email);
    if (oldUser) {
      throw {
        status: 409,
        message:
          "The user already exists. Please use your credentials to log in.",
      };
    }
  } catch (e) {
    const token = jwt.sign({ email: user.email }, PIRVATE_KEY, {
      expiresIn: "600s",
    });

    const encryptedPassword = await bcrypt.hash(password, 10);

    userDAO.save({ ...user, password: encryptedPassword });
    user.token = token;
  }

  return user;
};

const verifyUser = async (email: string, password: string) => {
  const user = await userDAO.getBy("email", email);
  if (!user) throw { status: 404, message: "User doesn't exists" };

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign({ id: user._id, email: email }, PIRVATE_KEY, {
      expiresIn: "10s",
    });
    user.token = token;
    return user;
  }
};

const getUserByEmail = async (email: string) => {
  const user = await userDAO.getBy("email", email);
  if (!user) throw { status: 404, message: "User doesn't exists" };
  return user;
};

export const userService = {
  createUser,
  verifyUser,
  getUserByEmail,
  DEFAULT_IMAGE,
};
