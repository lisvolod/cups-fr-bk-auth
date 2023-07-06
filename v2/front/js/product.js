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
                    productCard.classList.add("element");
                    
                    productCard.innerHTML = `
                    <div class="element-data">
                        <img src="${product.productImage}" class="element-img">
                        <div class="element-name">${product.productName}</div>
                        <p class="element-text">Volume: <span class="element-volume">${product.productVolume}</span> ml</p> 
                        <p class="element-text">Material: <span class="element-material">${product.productMaterial}</span></p> 
                    </div>
                    <div class="element-footer">
                        <button class="btn btn-primary" onclick="editProduct('${product._id}', '${product.productName}', '${product.productVolume}', '${product.productMaterial}', '${product.productImage}', '${product.cloudinaryPublicId}')">Edit</button><span> </span>
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
///

function editProduct(id, name, volume, mat, img, cloud) {
    convertModalToEdit();
    document.getElementById('productId').value = id;
    document.getElementById('productName').value = name;
    document.getElementById('productVolume').value = volume;
    document.getElementById('productMaterial').value = mat;
    document.getElementById('formImage').setAttribute("src", img) ;
    document.getElementById('oldCloudinaryPublicId').value = cloud;
    document.getElementById('oldImagePath').value = img;
    productModal.open();
}


