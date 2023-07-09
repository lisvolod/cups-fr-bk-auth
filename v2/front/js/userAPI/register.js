//
// ***** Реєстрація користувача *****
///

// Функція для збирання значення полів форми реєстрації чи авторизації
// function collectUserFormData(formName) {
//     const currentForm = document.forms[formName];
//     let formData = new FormData(currentForm);
//     return formData;
// }

// Функція для відправки запиту реєстраці 
async function userRegistetion() {
    // const reqBody = collectUserFormData("registerForm");
    const reqBody = {
        userRegName: document.getElementById('userRegName').value,
        userRegEmail: document.getElementById('userRegEmail').value,
        userRegPassword: document.getElementById('userRegPassword').value
    }
    // console.log(reqBody);
    // console.log(JSON.stringify(reqBody));
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',   // Встановлення Content-Type на "application/json"
        },
        credentials: 'include',                 // Don't forget to specify this if you need cookies
        body: JSON.stringify(reqBody),          // Перетворення даних форми в JSON-рядок
      };
      
      fetch(`${backURL}/user/register`, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Обробка відповіді від сервера
            // Обробка повідомлення про наявну email
            if (data.msg) {
                document.getElementById('registerEmailError').innerText =`${data.msg}`
            }
            else {
                // Очищуємо поля форми
                document.forms["registerForm"].reset();
                // Закриваємо модальне вікно
                registrationModal.close();
               
                 // Реєструємо отримані дані про користувача 
                // (для збереження стану авторизації після перезавантаження сторінки)
                setUser(data);
                // Рендеримо меню зареєстрованого користувача
                navbarRender(getUser());
                getAndShowAllProducts();
            }
        })
        .catch(err => {
            console.error(err);
        });
}

// Функції валідації Email
function validateEmail() {
    const email = document.getElementById('userRegEmail').value;
    return new Promise((resolve, reject) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
      if (!emailRegex.test(email)) {
        document.getElementById('registerEmailError').innerText = 'Невірний формат email';
        // reject('Невірний формат email');
      } else {
        // Якщо email валідний, відправляємо успішний результат
        resolve();
      }
    });
}

// Функції валідації для порівняння введеного паролю та підтвердження паролю
function validatePassword() {
    const password = document.getElementById('userRegPassword').value;
    const confirmPassword = document.getElementById('userRegConfirmPassword').value;
    return new Promise((resolve, reject) => {
      if (password !== confirmPassword) {
        document.getElementById('registerPasswordError').innerText = 'Паролі не співпадають';
        // reject('Паролі не співпадають');
      } else {
        // Якщо паролі проходять валідацію, відправляємо успішний результат
        resolve();
      }
    });
  }



/// Обробники подій

document.forms["registerForm"].addEventListener ('submit', async (e) => {
    e.preventDefault();
    try {
        await validateEmail();
        await validatePassword();
        // console.log("Валідація успішна");
        await userRegistetion();
        
      } catch (error) {
        console.log(error); // Помилка валідації пароля
      }

})




// При втраті фокуса поля  валідуємо email
userRegEmail.addEventListener('blur', () => {
    validateEmail();
})
// Очищуємо повідомлення про помилки коли поля форми у фокусі 
userRegEmail.addEventListener('focus', () => {
    document.getElementById('registerEmailError').innerText = '';
});
userRegPassword.addEventListener('focus', () => {
    document.getElementById('registerPasswordError').innerText = '';
});
userRegConfirmPassword.addEventListener('focus', () => {
    document.getElementById('registerPasswordError').innerText = '';
})