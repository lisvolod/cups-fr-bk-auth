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
    renderProductCategegoriesOptions();
}

const getCategories = () => {
    return JSON.parse(localStorage.getItem('categories'));
};

function renderProductCategegoriesOptions() {
    // Випадаючий список для категорій товарівпри створенні продуктів 
    // (модалка перемальовується) при створенні нової категорії
    // Вибираємо select i очищуємо його
    const producCategory = document.getElementById('producCategory');
    producCategory.innerHTML = ``;
    // Додаємо в нього опцію по замовчуванню 
    // <option disabled selected value> -- select a category -- </option>
    const defaultProductCategoryOption = document.createElement('option');
    defaultProductCategoryOption.setAttribute("disabled", "");
    defaultProductCategoryOption.setAttribute("selected", "");
    defaultProductCategoryOption.setAttribute("value", "");
    defaultProductCategoryOption.innerText = ` -- select a category -- `;
    producCategory.appendChild(defaultProductCategoryOption);
    
    // Вибираємо категорії товарів з LS
    const categoryArr = getCategories();
    
    categoryArr.forEach(category => {
        const categoryOption = document.createElement('option');
        categoryOption.value = category._id;
        categoryOption.innerText = `${category.name}`;
        producCategory.appendChild(categoryOption);
    });
}

// Оновлювати токен кожні 3 хвилин
setInterval(refreshToken, 3 * 60 * 1000);

