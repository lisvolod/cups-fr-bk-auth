// Оновлення токена доступу
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

// Оновлювати токен кожні 3 хвилин
setInterval(refreshToken, 3 * 60 * 1000);