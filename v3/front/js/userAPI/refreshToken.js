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
                    if (data.msg === 'Token updated successful') {
                            console.log(data);
                            res();
                    }
                    if (data.message === 'Invalid access token') {
                        localStorage.clear();
                        location.reload();
                    //     popUpWithCloseBtn(`<div>Security token ERROR!</div>
                    //     <div>Please logOut, then logIn again</div>`, 'danger');
                    }
                    if (data.message === 'Authorization error') {
                        localStorage.clear();
                        location.reload();
                        // popUpWithCloseBtn(`<div>Authorization ERROR!</div>
                        //                     <div>Please, logIn</div>`, 'danger');
                    }
                })
                .then(res())
                .catch(error => {
                  console.error('Error:', error);
                });
        } else {
            localStorage.clear();
            location.reload();
            // popUpWithCloseBtn(`<div>Authorization ERROR!</div>
            //         <div>Please, logIn</div>`, 'danger');
            rej('Please, log in');
        }
    })    
}

// Оновлювати токен кожні 3 хвилин
setInterval(refreshToken, 3 * 60 * 1000);
// setInterval(refreshToken, 20 * 1000);

// document.addEventListener("DOMContentLoaded", refreshToken);
