// Рендер меню CATEGORIES для адміністратора
const categoryRender = async () => {
    //Закриваємо випадаюче меню в адаптиві 
    dropDownClose();
    const btnContainer = document.querySelector(".btn-container");
    // Очищуємо контейнер кнопок
    btnContainer.innerHTML = ``;
    btnContainer.innerHTML = `<button type="button" class="btn btn-secondary" id="createCtgBtn" onclick="createCatgoryModal.open()">Create New Category of Products</button>`;
    
    // Очищуємо контейнер даних
    const dataContainer = document.querySelector(".data-container");
    dataContainer.innerHTML = "";        
    
    // Створюємо контейнер для карточок категорій
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    dataContainer.appendChild(categoryContainer);
    
    // Перевіряємо, чи є категорії
    const catArr = getCategories();
    
    // console.log(catArr);
    
    if (catArr.length) {
        catArr.forEach(category => {
            dropDownClose();
            
            // Якщо є - рендиримо карточки категорій
            
            categoryCardRender(category);
        });
    }
    else {
        const categoryContainer = document.querySelector(".category-container");
        const categoryCard = document.createElement("div");
        categoryCard.classList.add("empy-errors");
        categoryCard.innerHTML = `<div class="empy-errors-item">No categories found yet. </div>
                                  <div class="empy-errors-item">Create some category,</div>
                                  <div class="empy-errors-item">then create products.</div>`;
        categoryContainer.appendChild(categoryCard); 
    }
}


async function validateCategoryName(valuePath, errMsgPath) {
    const category = document.getElementById(valuePath).value.trim();
    const regExp = /^\p{L}+$/u;
    const isValid = regExp.test(category);
    return new Promise ((res, rej) => {
        if (!isValid) {
            document.getElementById(errMsgPath).innerText = 'Use only one word with no numbers';
        } else {
            res();
        }
    })
}

async function sendCategorytData(route, form, valuePath, errMsgPath, id) {
    return new Promise ((resolve, reject) => {
        const categoryName = document.getElementById(valuePath).value.trim().toUpperCase();
        const reqBody = {
            categoryName: categoryName,
            categoryId: id
        }
        // console.log('reqBody', reqBody);
        fetch (`${backURL}/category/${route}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            // Встановлення Content-Type на "application/json"
            headers: {
                'Content-Type': 'application/json',   
            },
            body: JSON.stringify(reqBody),
        })
        .then(response => response.json())
        .then(data => {
            // Обробка відповіді від сервера
            // Обробка повідомлення про наявну email
            if (data.msg) {
                document.getElementById(`${errMsgPath}`).innerText =`${data.msg}`
            }
            else {
                // Очищуємо поля форми
                document.forms[form].reset();
                // Закриваємо модальне вікно
                createCatgoryModal.close();
                editCatgoryModal.close();
              
            }
            resolve();
        })
        .catch(err => {
            console.error(err);
            reject(err)
        });  
    })
    
}

async function getAllCategoriesFromDB() {
    return new Promise ( (resolve, reject) => {
        fetch (`${backURL}/category`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'       
        })
        .then(response => response.json())
        .then(data => {
            // Обробка відповіді від сервера
            if (data.msg) {
                console.log(data.msg);
            } else {
                setCategories(data);
                resolve(data);
            }
            
        })
        .catch(err => {
            console.error(err);
            reject(err);
        });  
    })
    
}

const removeCategory = async (category) => {
    const msg = document.getElementsByClassName('confirmation-message')[0];
    msg.innerHTML = `Are you sure you want to remove category <b>${category.name}</b>? </br>
    <b>ALL PRODUCTS</b> of this category will also be <b>REMOVED</b>.</br>
    You can change the category in the products before removing the category..`
    
    return new Promise ( async (resolve, reject) => {
        try {
            confirmModal.open();
            await waitForRemoveButtonPress();    // Зупинити виконання до натискання кнопки
            // let deleteParams = JSON.stringify({_id:a, cloudinaryPublicId:b})
            await fetch(`${backURL}/category/${category._id}`, {
                method: "DELETE",
                mode: 'cors',
                credentials: 'include',                 // Don't forget to specify this if you need cookies
                })
                .then( async () => {
                    removeButton.removeEventListener('click', () => {resolve();}); // Видалити обробник для економії пам'яті
                    confirmModal.close();
                    await getAllCategoriesFromDB();
                    categoryRender(); 
                })
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}


const editCategory = async (category) => {
    document.getElementById('editCategoryId').setAttribute("value", category._id);
    document.getElementById('editCategoryName').value = category.name;
    editCatgoryModal.open();
}


// Обробники відправки форм
document.forms["createCategoryForm"].addEventListener ('submit', async (e) => {
    e.preventDefault();
    await validateCategoryName('createCategoryName' ,'createCategoryNameError');
    await sendCategorytData('create','createCategoryForm','createCategoryName', 'createCategoryNameError' );
    await getAllCategoriesFromDB();
    categoryRender(); 
})

document.forms["editCategoryForm"].addEventListener ('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editCategoryId').value;
    await validateCategoryName('editCategoryName' ,'editCategoryNameError');
    await sendCategorytData('edit','editCategoryForm','editCategoryName', 'editCategoryNameError', id );
    await getAllCategoriesFromDB();
    categoryRender();
})

// Очищуємо повідомлення про помилки коли поля форми у фокусі 
createCategoryName.addEventListener('focus', () => {
    document.getElementById('createCategoryNameError').innerText = '';
});

editCategoryName.addEventListener('focus', () => {
    document.getElementById('editCategoryNameError').innerText = '';
});

