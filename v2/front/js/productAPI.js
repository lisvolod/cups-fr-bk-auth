//
// ***** Видалення продукту
///

// Кнопка Remove
const removeButton = document.getElementById('removeProductBtn');

// Функція, яка повертає проміс, який буде вирішений (resolved) при натисканні кнопки Remove
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
    await fetch(`${backURL}/product`)
    .then(response => response.json())                      // Парсимо [object Response] 
    .then(data => {                                         // Парсимо [object Promise]
            const dataContainer = document.querySelector(".dataContainer");
            dataContainer.innerHTML = "";                   // Очищуємо контейнер
            if (data.length) {
                data.forEach(product => {
                    let productCard = document.createElement("div");
                    productCard.classList.add("product");
                    
                    productCard.innerHTML = `
                    <div class="product-data">
                        <img src="${product.productImage}" class="product-img">
                        <div class="product-name">${product.productName}</div>
                        <p class="product-text">Volume: <span class="product-volume">${product.productVolume}</span> ml</p> 
                        <p class="product-text">Material: <span class="product-material">${product.productMaterial}</span></p>
                        <p class="product-text">Price: <span class="product-price">${product.productPrice} &#x20b4 </span></p>  
                    </div>
                    <div class="product-footer">
                        <button class="btn btn-primary" onclick="editProduct('${product._id}', '${product.productName}', '${product.productVolume}', '${product.productMaterial}', '${product.productPrice}','${product.productImage}', '${product.cloudinaryPublicId}')">Edit</button><span> </span>
                        <button class="btn btn-danger" onclick="removeProduct('${product._id}', '${product.cloudinaryPublicId}')">Delete</button>
                    </div>
                    `;
                    
                    const dataContainer = document.querySelector(".dataContainer");
                    dataContainer.appendChild(productCard);
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
            body: collectProductFormData('productForm')
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


