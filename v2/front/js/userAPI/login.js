//
// ***** Авторизація користувача *****
//

// Функція для відправки запиту авторизації 
async function userLogin() {
    
    const reqBody = {
        userLoginEmail: document.getElementById('userLoginEmail').value,
        userLoginPassword: document.getElementById('userLoginPassword').value
    }
   
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',   // Встановлення Content-Type на "application/json"
        },
        credentials: 'include',                 // Don't forget to specify this if you need cookies
        body: JSON.stringify(reqBody),          // Перетворення даних форми в JSON-рядок
      };
      
      fetch(`${backURL}/user/login`, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Обробка відповіді від сервера
            // Обробка повідомлення про наявну email
            if (data.emailMsg) {
                document.getElementById('loginEmailError').innerText =`${data.emailMsg}`
            }
            if (data.pwdMsg) {
                document.getElementById('loginPasswordError').innerText =`${data.pwdMsg}`
            }
            else {
                // Очищуємо поля форми
                document.forms["loginForm"].reset();
                // Закриваємо модальне вікно
                loginModal.close();
                
                // Реєструємо отримані дані про користувача 
                // (для збереження стану авторизації після перезавантаження сторінки)
                setUser(data);
                // Рендеримо меню авторизованого користувача
                navbarRender(getUser());
                getAndShowAllProducts();
            }
        })
        .catch(err => {
            console.error(err);
        });
}

// Функції валідації Email
function validateLoginEmail() {
    const email = document.getElementById('userLoginEmail').value;
    return new Promise((resolve, reject) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
      if (!emailRegex.test(email)) {
        document.getElementById('loginEmailError').innerText = 'Невірний формат email';
        // reject('Невірний формат email');
      } else {
        // Перевіряємо чи email має правильний формат 
        resolve();
      }
    });
}

/// Обробники подій

document.forms["loginForm"].addEventListener ('submit', async (e) => {
    e.preventDefault();
    try {
        await validateLoginEmail();
        await userLogin();
        
      } catch (error) {
        console.log(error); 
      }

})


// При втраті фокуса поля  валідуємо email
userLoginEmail.addEventListener('blur', () => {
    validateEmail();
})
// Очищуємо повідомлення про помилки коли поля форми у фокусі 
userLoginEmail.addEventListener('focus', () => {
    document.getElementById('loginEmailError').innerText = '';
});
userLoginPassword.addEventListener('focus', () => {
    document.getElementById('loginPasswordError').innerText = '';
});
