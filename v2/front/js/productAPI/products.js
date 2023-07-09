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

async function removeProduct(a, b) {
    confirmModal.open();
    await waitForRemoveButtonPress();    // Зупинити виконання до натискання кнопки
        let deleteParams = JSON.stringify({_id:a, cloudinaryPublicId:b})
        await fetch(`${backURL}/product/`, {
            method: "DELETE",
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

async function getAndShowAllProducts() {
    await fetch(`${backURL}/product`, {
        method: 'GET',
        credentials: 'include'                 // Don't forget to specify this if you need cookies
    })
    .then(response => response.json())                      // Парсимо [object Response] 
    .then(data => {                                         // Парсимо [object Promise]
            const dataContainer = document.querySelector(".data-container");
            dataContainer.innerHTML = "";                   // Очищуємо контейнер
            if (data.length) {
                data.forEach(product => {
                    // console.log(product);
                    productCardRender(product);
                });
            }
            else {
                dataContainer.innerHTML = `<div style='color:red'>
                                                <h1 style='color:red'>No products found yet. </h1>
                                                <h1>Create some product...</h1>
                                            </div>`
            }
           
    })
}

//
// ***** Редагування продукту (заповнення полів модалки)
//

function editProduct(id, name, volume, mat, price, img, cloud) {
    convertModalToEdit();
    document.getElementById('productId').value = id;
    document.getElementById('productName').value = name;
    document.getElementById('productVolume').value = volume;
    document.getElementById('productMaterial').value = mat;
    document.getElementById('productPrice').value = price;
    document.getElementById('formImage').setAttribute("src", img) ;
    document.getElementById('oldCloudinaryPublicId').value = cloud;
    document.getElementById('oldImagePath').value = img;
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


