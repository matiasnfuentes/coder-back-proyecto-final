import { UserDTO } from "../model/userModel";
import { UserDAO } from "../persistance/mongodb/userDAO";
import * as bcrypt from "bcrypt";
import { DAOFactory, USER } from "../persistance/DAOFactory";

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
    const encryptedPassword = await bcrypt.hash(password, 10);
    userDAO.save({ ...user, password: encryptedPassword });
  }

  return user;
};

const verifyUser = async (email: string, password: string) => {
  const user = await userDAO.getBy("email", email);
  if (!user) throw { status: 404, message: "User doesn't exists" };

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
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
