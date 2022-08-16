import { body, param, validationResult } from "express-validator";
import _ from "lodash";

export const CREATE_USER = "Create user";
export const LOGIN = "Login";
export const ADD_PRODUCT = "Add product";
export const UPDATE_PRODUCT = "Update product";
export const ADD_MESSAGE = "Add message";
export const ADD_PRODUCT_TO_CART = "Add product to cart";
export const DELETE_PRODUCT_FROM_CART = "Delete product to cart";

export type RequestInput =
  | "Create user"
  | "Login"
  | "Add product"
  | "Update product"
  | "Add message"
  | "Add product to cart"
  | "Delete product to cart";

export const validate = (method: RequestInput) => {
  switch (method) {
    case CREATE_USER:
      return [
        body("email", "Invalid email").exists().isEmail(),
        body("password", "Password must be at least 5 characters long")
          .exists()
          .isLength({ min: 5 })
          .custom((value, { req }) => {
            if (value !== req.body.repeatPassword) {
              throw new Error("password must match");
            } else {
              return value;
            }
          }),
        body("address", "Invalid address").exists().isString(),
        body("name", "Invalid name").exists().isString(),
        body("age", "Invalid age. It must be a number.").exists().isInt(),
        body("phone", "Invalid phone").exists().isString(),
      ];
    case LOGIN:
      return [
        body("email", "Invalid email").exists().isEmail(),
        body("password", "Invalid password").exists(),
      ];
    case ADD_PRODUCT:
      return [
        body("name", "Invalid name").exists().isString(),
        body("description", "Invalid description").exists().isString(),
        body("code", "Invalid code").exists().isString(),
        body("category", "Invalid category").exists().isString(),
        body("thumbnail", "Invalid thumbnail. It must be a URL")
          .exists()
          .isURL(),
        body("price", "Prince must be a number").exists().isNumeric(),
        body("stock", "Stock must be an integer").exists().isInt(),
      ];
    case ADD_PRODUCT_TO_CART:
      return [
        param("id").exists(),
        param("productId").exists(),
        body("name", "Invalid name").exists().isString(),
        body("description", "Invalid description").exists().isString(),
        body("code", "Invalid code").exists().isString(),
        body("category", "Invalid category").exists().isString(),
        body("thumbnail", "Invalid thumbnail. It must be a URL")
          .exists()
          .isURL(),
        body("price", "Prince must be a number").exists().isNumeric(),
        body("stock", "Stock must be an integer").exists().isInt(),
      ];
    case UPDATE_PRODUCT:
      return [
        param("id").exists(),
        body("name", "Invalid name").isString().optional(),
        body("description", "Invalid description").isString().optional(),
        body("code", "Invalid code").isString().optional(),
        body("category", "Invalid category").exists().optional(),
        body("thumbnail", "Invalid thumbnail. It must be a URL")
          .isURL()
          .optional(),
        body("price", "Price must be a number").isNumeric().optional(),
        body("stock", "Stock must be an integer").isInt().optional(),
      ];
    case ADD_MESSAGE:
      return [
        body("author.id", "Invalid email").exists().isEmail(),
        body("author.firstName", "Invalid first name").exists().isString(),
        body("author.lastName", "Invalid last name").exists().isString(),
        body("author.alias", "Invalid alias").exists().isString(),
        body("author.age", "Age must be a number").exists().isInt(),
        body("author.avatar", "Avatar must be an url").optional().isURL(),
      ];
    case DELETE_PRODUCT_FROM_CART:
      return [param("id").exists(), param("productId").exists()];
    default:
      throw { status: 500, message: "Invalid request" };
  }
};

export const checkBodyErrors = (req) => {
  const errors = validationResult(req);

  const parsedErrors = _.uniq(errors.array().map((e) => e.msg));

  if (!errors.isEmpty()) {
    const errorMessages = parsedErrors;
    console.log(errorMessages);
    throw { status: 400, message: errorMessages };
  }
};
