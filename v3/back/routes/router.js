import express from 'express';
import productRouter from './productRouter.js';
import userRouter from './userRouter.js';
import categoryRouter from './categoryRouter.js';

const router = express.Router();

router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/category', categoryRouter);

export default router;