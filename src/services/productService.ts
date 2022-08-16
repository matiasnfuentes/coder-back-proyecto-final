import { DAOFactory, PRODUCT } from "../persistencia/DAOFactory";
import { ProductDAO } from "../persistencia/mongodb/productDAO";
import { ProductDTO } from "../persistencia/types";

const productDAO = DAOFactory.createDAO(PRODUCT) as ProductDAO;
const INCREASE = "Increase";
const DECREASE = "Decrease";
type StockOperation = "Increase" | "Decrease";

const getAll = async (): Promise<ProductDTO[]> => {
  const p = await productDAO.getAll();
  return p;
};

const getById = async (_id: string): Promise<ProductDTO> =>
  await productDAO.get(_id);

const getByCategory = async (category: string): Promise<ProductDTO[]> =>
  await productDAO.getAllBy("category", category);

const addProduct = async (product: ProductDTO): Promise<ProductDTO> => {
  return await productDAO.save(product);
};

const deleteProductById = async (id: string): Promise<void> => {
  await productDAO.deleteBy("_id", id);
};

const updateStock = async (
  product: ProductDTO,
  stockOperation: StockOperation
): Promise<void> => {
  if (!product._id) throw { status: 400, message: "Product id missing" };

  const storedProduct: ProductDTO = await getById(product._id);
  let newStock: number = storedProduct.stock;

  if (stockOperation === INCREASE) {
    newStock += product.stock;
  } else {
    newStock -= product.stock;
  }

  await productDAO.update(product._id, { stock: newStock });
};

const decreaseStock = async (product: ProductDTO): Promise<void> => {
  updateStock(product, DECREASE);
};

const increaseStock = async (product: ProductDTO): Promise<void> => {
  updateStock(product, INCREASE);
};

const haveEnoughStock = async (product: ProductDTO): Promise<Boolean> => {
  if (!product._id) throw { status: 400, message: "Product id missing" };
  const storedProduct: ProductDTO = await getById(product._id);
  return storedProduct.stock >= product.stock;
};

const updateProduct = async (
  id: string,
  updates: Partial<ProductDTO>
): Promise<ProductDTO> => {
  return await productDAO.update(id, updates);
};

export const productService = {
  addProduct,
  decreaseStock,
  deleteProductById,
  getAll,
  haveEnoughStock,
  updateProduct,
  getById,
  increaseStock,
  getByCategory,
};
