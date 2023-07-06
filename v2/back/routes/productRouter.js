import express from "express";
import { createProduct, deleteProduct, getAllProducts } from "../controllers/productController.js";

const productRouter = express.Router();
const jsonParser = express.json()

productRouter.post('/', createProduct);
productRouter.get('/', getAllProducts);
productRouter.delete("/", jsonParser, deleteProduct);

export default productRouter;