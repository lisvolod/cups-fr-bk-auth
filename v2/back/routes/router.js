import express from 'express';
import productRouter from './productRouter.js';

const router = express.Router();

router.use('/product', productRouter)

export default router;