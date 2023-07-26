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
                  if (data.message === 'Invalid access token') {
                    popUpWithCloseBtn(`<div>Security token ERROR!</div>
                    <div>Please logOut, then logIn again</div>`, 'danger');
                  }
                  if (data.message === 'Authorization error') {
                    popUpWithCloseBtn(`<div>Authorization ERROR!</div>
                                        <div>Please, logIn</div>`, 'danger');
                  }
                })
                .then(res())
                .catch(error => {
                  console.error('Error:', error);
                });
        } else {
            popUpWithCloseBtn(`<div>Authorization ERROR!</div>
                    <div>Please, logIn</div>`, 'danger');
            rej('Please, log in');
        }
    })    
}

// Оновлювати токен кожні 3 хвилин
setInterval(refreshToken, 3 * 60 * 1000);