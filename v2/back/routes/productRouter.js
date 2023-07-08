import express from "express";
import { createAndEditProduct, deleteProduct, getAllProducts } from "../controllers/productController.js";

const productRouter = express.Router();
const jsonParser = express.json()

productRouter.post('/', createAndEditProduct);
productRouter.get('/', getAllProducts);
productRouter.delete("/", jsonParser, deleteProduct);

export default productRouter;