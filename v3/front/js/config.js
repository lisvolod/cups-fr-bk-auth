// const backURL = `https://cups-store.onrender.com`;
// Змінити backURL на `http://localhost:4000` при запуску на локальному сервері;
const backURL = `http://localhost:4000`;

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const clearStorage = async () => {
    localStorage.clear();
};

const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}; 

async function refreshToken() {
        return new Promise( (res, rej) => {
            if (getUser()) {
                return fetch(`${backURL}/user/refresh_token`, {
                    method: 'POST',
                    mode: 'cors', 
                    credentials: 'include'
                  })
                    .then(response => response.json())
                    .then(data => {
                      // Обробка отриманих даних
                      console.log(data);
                    })
                    .then(res())
                    .catch(error => {
                      console.error('Error:', error);
                    });
            } else {
                rej('Please, log in');
            }
        })    
   
       
}

const setCategories = (categories) => {
    localStorage.setItem('categories', JSON.stringify(categories));
}

const getCategories = () => {
    return JSON.parse(localStorage.getItem('categories'));
};




// Оновлювати токен кожні 3 хвилин
setInterval(refreshToken, 3 * 60 * 1000);

