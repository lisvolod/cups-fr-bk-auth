import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userRegister = async (req, res) => {
    try {
        // console.log(req.body);
        const {userRegName, userRegEmail, userRegPassword} = req.body;
        
        // Перевіряємо чи є електронна вже електронна пошта в базі
        const user = await User.exists({ email: userRegEmail})
        
        if (user) return res.status(400).json({msg: "This email is already in use"})

        // Шифруємо пароль
        const passwordHash = await bcrypt.hash(userRegPassword, 10);
        
        // Інстанс нового юзера
        const newUser = new User ({
            name: userRegName,
            email: userRegEmail,
            password: passwordHash
        });
        
        // Запис в БД
        await newUser.save();

        // Створюємо два JWT-токени 
        // accesstoken  - з коротким терміном дії для авторизації 
        // refreshtoken - з довгим терміном дії для можливості оновлення accesstoken
        const accesstoken = createAccessToken({id: newUser._id});
        const refreshtoken = createRefreshToken({id: newUser._id});
        // Відправляємо токени в куки
        res.cookie('accessToken', accesstoken, { httpOnly: true, secure: true });
        res.cookie('refreshToken', refreshtoken, { httpOnly: true, secure: true });
        res.status(200).json({ msg: 'Успішний вхід' });

    } catch (error) {
        console.error(error);
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken)  return res.status(401).json({ msg: "Помилка оновлення токена. Refreshtoken відсутній" });
  
        // Перевірка оновлювального токена
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(decoded);
        // Отримання ідентифікатора користувача з refreshToken
        const userId = decoded.userId;

        // Оновлення доступу до токена
        const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        // Відправка нового токена через HTTP-Only куку
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });

        res.status(200).json({ msg: 'Оновлення токена успішне' });

    } catch (error) {
        console.error('Помилка перевірки або оновлення токена:', error);
        res.status(401).json({ msg: 'Недійсний оновлювальний токен' });
    }
}

export const userLogout = async (req, res) => {
    try {
        // Видалення токенів з кукі
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json({ msg: 'Вихід здійснено' });
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

export const userLogin = async (req, res) => {
    try {
        // Отримання даних з тіла запиту
        const { userLoginEmail, userLoginPassword } = req.body;

        // Перевірка чи існує користувач 
        const user = await User.findOne({userLoginEmail})
        if(!user) return res.status(400).json({msg: "Користувача не існує"})
        
        // Перевірка паролю
        const isMatch = await bcrypt.compare(userLoginPassword, user.password)
        if(!isMatch) return res.status(400).json({msg: "Невірний пароль"})
        
        // Якщо авторизація успішна - ствропення та відправка в куки токенів
        const accesstoken = createAccessToken({id: user._id});
        const refreshtoken = createRefreshToken({id: user._id});
        // Відправляємо токени в куки
        res.cookie('accessToken', accesstoken, { httpOnly: true, secure: true });
        res.cookie('refreshToken', refreshtoken, { httpOnly: true, secure: true });
        res.status(200).json({ msg: 'Успішний вхід' });

    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
}


const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}