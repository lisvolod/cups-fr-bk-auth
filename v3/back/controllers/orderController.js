import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

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

export const getOrders = async (req, res) => {
    try {
        const userId = req.params.userId
        await User.find({_id: userId})
                .then (async (data) => {
                    // Якщо користувач isAdmin - відправляємо всі замовлення
                    const findedUser = data[0];
                    if (findedUser.isAdmin) {
                        await Order.find()
                            .sort({ _id: -1 })
                            .then( allOrders => {
                                console.log(allOrders);
                                res.status(200).json(allOrders);
                            })
                            .catch ( err => {
                                console.log('Помилка отримання всіх замовлень', err);
                                res.status(401).json({ message: 'Помилка отримання всіх замовлень' });
                            })
                    } else {
                    // інакше - відправляємо замовлення авторизованого покупця
                        await Order.find({user: userId})
                            .sort({ _id: -1 })
                            .then( userOrders => {
                                res.status(200).json(userOrders);
                            })
                            .catch ( err => {
                                console.log('Помилка отримання замовлень користувача', err);
                                res.status(401).json({ message: 'Помилка отримання замовлень користувача' });
                            })
                    }
                })
                .catch(error => {
                    console.error('Помилка отримання даних користувача:', error);
                    res.status(401).json({ message: 'Помилка отримання даних користувача з БД' });
                  });
        } catch (error) {
            console.error('Помилка отримання userId:', error);
            res.status(401).json({ message: 'Помилка отримання userId' });
    }
}