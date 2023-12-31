import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try {
        // Парсимо куки і вибираємо з них accessToken
        const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
            const [name, value] = cookie.trim().split('=');
            acc[name] = value;
            return acc;
          }, {});
        
        const accessToken = cookies.accessToken;
        
        if(!accessToken) return res.status(400).json({msg: "Authorization error"})
        
        new Promise((resolve, reject) => {
                jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                            if (err) { reject(err);} else {resolve(decoded);}
                            });
            })
            .then(decoded => {
            // Токен валідний, доступ до decoded даних
            // В decoded прилітає з клієнта id користувача з папаметрами 
            // життя токена { id: '64a8c35b12c38df8f9766862', iat: 1689344685, exp: 1689345585 }
            // Прикручуємо цей об'єкт до запиту (req) і викликаємо наступний middleware ( next() )
            // По суті передаємо цей об'єкт в authAdmin.js, де будемо перевіряти по id,  
            // чи користувач є адміністратором
            
            req.user = decoded;
                          
            })
            .then (() => {
                next() 
            })
            .catch(err => {
              res.status(401).json({ message: 'Invalid access token' });
            });
        }
    
    catch (error) {
        return res.status(500).json({msg: error.maggage})
    }
}