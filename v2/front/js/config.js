// const backURL = `https://cups-store.onrender.com`;
// Змінити backURL на `http://localhost:4000` при запуску на локальному сервері;
const backURL = `http://localhost:4000`;

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const removeUser = async () => {
    localStorage.removeItem('user')
};

const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}; 

async function refreshToken() {
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
        .catch(error => {
          console.error('Error:', error);
        });
}

// Оновлювати токен кожні 10 хвилин
setInterval(refreshToken, 10 * 60 * 1000);

