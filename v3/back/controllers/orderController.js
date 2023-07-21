import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
    const { userId, name, address, cart } = req.body;
    const newOrder = {
        user: userId,
        name,
        address,
        cart
    }
    await Order.create(newOrder)
            .then(res.status(200).json({ msg: 'Замовлення оформлено' }))
            .catch(error => {
                console.error('Помилка при створенні користувача:', error);
                res.status(401).json({ message: 'Помилка запису замовлення в БД' });
              });
}