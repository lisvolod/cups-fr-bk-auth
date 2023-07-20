//
// ***** Видалення продукту
///

// Кнопка Remove у модалці Removal confirmation
const removeButton = document.getElementById('removeProductBtn');

// Функція, яка повертає проміс, який буде вирішений (resolved) 
// при натисканні кнопки Remove у модалці Removal confirmation
function waitForRemoveButtonPress() {
        return new Promise((resolve, reject) => {
            removeButton.addEventListener('click', () => {
            resolve();                  // Вирішити проміс, коли кнопка буде натиснута
        });
    });
}

async function removeProduct(product) {
    const msg = document.getElementsByClassName('confirmation-message')[0];
    msg.innerHTML = `Are you sure you want to remove <b>${product.name}</b>`
    confirmModal.open();
    await waitForRemoveButtonPress();    // Зупинити виконання до натискання кнопки
        let deleteParams = JSON.stringify({_id:product._id, cloudinaryPublicId: product.cloudinaryPublicId})
        await fetch(`${backURL}/product/`, {
            method: "DELETE",
            mode: 'cors',
            credentials: 'include',                 // Don't forget to specify this if you need cookies
            headers: {
                'Content-Type': 'application/json'
            },
            body: deleteParams
        })
        .then( () => {
            removeButton.removeEventListener('click', () => {resolve();}); // Видалити обробник для економії пам'яті
            confirmModal.close();
            getAndShowAllProducts();
        })
    }
    

//
// ***** Показати всі продукти
///

// Функція для рендерингу кнопки "Create New Product"
function btnRender() {
    const btnContainer = document.querySelector(".btn-container");
    btnContainer.innerHTML = ``;
    // Перевіряємо, чи короситувач є адміністатором
    const user = getUser();
    // Якщо адміністратор - малюємо кнопку "Створити продукт"
    
    if ( user && user.isAdmin) {
        btnContainer.innerHTML = `<button type="button" class="btn btn-secondary" id="createBtn" onclick="openProductModalWithCreate()">Create New Product</button>`;
    }
}


async function getAndShowAllProducts() {
    await fetch(`${backURL}/product`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'                 // Don't forget to specify this if you need cookies
    })
    .then(response => response.json())                      // Парсимо [object Response] 
    .then(data => {                                         // Парсимо [object Promise]
            // Закриваємо випадаюче меню в адаптиві 
            dropDownClose();
            btnRender();            
            const dataContainer = document.querySelector(".data-container");
            dataContainer.innerHTML = "";                   // Очищуємо контейнер продуктів
            
            // Перевіряємо, чи є продукти
            if (data.length) {
                data.forEach(product => {
                    // console.log(product);
                    dropDownClose();
                    // Якщо є - рендиримо карточки продуктів
                    productCardRender(product);
                });
            }
            else {
                dataContainer.innerHTML = `<div class="empy-errors">
                    <div class="empy-errors-item">No products found yet. </div>
                    <div class="empy-errors-item">First - create some category,</div>
                    <div class="empy-errors-item">then you'll be able to create products.</div>
                </div>`
            }
           
    })
}

//
// ***** Редагування продукту (заповнення полів модалки)
//

function editProduct(product) {
    convertModalToEdit();
    renderProductCategegoriesOptions();
    // Шукаємо, яка прийшла категорія, і вибираємо її
    const categoryListBox = document.querySelector('#producCategory');
    const options = Array.from(categoryListBox.options);
    const optionToSelect = options.find(item => item.text === product.category.name);
    optionToSelect.selected = true;

    document.getElementById('productId').value = product._id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productVolume').value = product.volume;
    document.getElementById('productMaterial').value = product.material;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('formImage').setAttribute("src", product.image) ;
    document.getElementById('oldCloudinaryPublicId').value = product.cloud;
    document.getElementById('oldImagePath').value = product.image;
    productModal.open();
}

//
// ***** Створення нового продукту 
//

// Функція для збирання значення полів форми продуктів
function collectProductFormData(formName) {
    const currentForm = document.forms[formName];
    let formData = new FormData(currentForm);
    document.forms[formName].reset();
    clearHiddenProductFormAttrib();
    return formData;
}
// Функція для відправки запиту на створення нового продукту
async function sendProductData() {
    try {
        await fetch (`${backURL}/product`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: collectProductFormData('productForm'),
        }) 
    } catch (error) {
        console.error(error);
    }
   
}

// Обробник відправки форми
document.forms["productForm"].addEventListener ('submit', (e) => {
    e.preventDefault();
    productModal.close();
    convertModalToCreate();
    sendProductData()
    .then( () => {getAndShowAllProducts()} )
    .catch (err => console.error(err)) ;    
})


