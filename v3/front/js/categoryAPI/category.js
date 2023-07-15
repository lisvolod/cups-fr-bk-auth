function categoryRender() {
    const btnContainer = document.querySelector(".btn-container");
    // Очищуємо контейнер кнопок
    btnContainer.innerHTML = ``;
    btnContainer.innerHTML = `<button type="button" class="btn btn-secondary" id="createBtn" onclick="openCategoryModalWithCreate()">Create New Category of Products</button>`;
    
    // Очищуємо контейнер даних
    const dataContainer = document.querySelector(".data-container");
    dataContainer.innerHTML = "";                   
}


async function validateCategoryName() {
    const category = document.getElementById('categoryName').value.trim();
    const regExp = /^\w+$/;
    const isValid = regExp.test(category);
    return new Promise ((res, rej) => {
        if (!isValid) {
            document.getElementById('categoryNameError').innerText = 'Use only one word';
        } else {
            res();
        }
    })
}

async function sendCategorytData() {
    const category = document.getElementById('categoryName').value.trim();
    const reqBody = {
        category
    }
    fetch (`${backURL}/category`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',   // Встановлення Content-Type на "application/json"
        },
        body: JSON.stringify(reqBody),
    })
    .then(response => response.json())
    .then(data => {
        // Обробка відповіді від сервера
        // Обробка повідомлення про наявну email
        if (data.msg) {
            document.getElementById('categoryNameError').innerText =`${data.msg}`
        }
        else {
            // Очищуємо поля форми
            document.forms["categoryForm"].reset();
            // Закриваємо модальне вікно
            categoryModal.close();
            
                // Реєструємо отримані дані про користувача 
            // (для збереження стану авторизації після перезавантаження сторінки)
            setCategories(data);
            // Рендеримо меню зареєстрованого користувача
            // navbarRender(getUser());
            // getAndShowAllProducts();
        }
    })
    .catch(err => {
        console.error(err);
    });  
}




// Обробник відправки форми
document.forms["categoryForm"].addEventListener ('submit', async (e) => {
    e.preventDefault();
    await validateCategoryName();
    await sendCategorytData();
    
    
    // convertModalToCreate();
    // sendCategorytData()
    // .then( () => {getAndShowAllProducts()} )
    // .catch (err => console.error(err)) ;    
})


// Очищуємо повідомлення про помилки коли поля форми у фокусі 
categoryName.addEventListener('focus', () => {
    document.getElementById('categoryNameError').innerText = '';
});